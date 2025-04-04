package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/go-faker/faker/v4"
)

type Item struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

var items []Item

func init() {
	for i := 0; i <= 5000; i++ {
		items = append(items, Item{
			ID:          i,
			Name:        faker.Name(),
			Description: faker.Paragraph(),
		})
	}
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Vary", "Origin")
		w.Header().Add("Vary", "Access-Control-Request-Method")

		origin := r.Header.Get("Origin")

		if origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)

			if r.Method == http.MethodOptions && r.Header.Get("Access-Control-Request-Method") != "" {
				w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, PUT, PATCH, DELETE")
				w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")
				w.Header().Set("Access-Control-Max-Age", "60")
				w.WriteHeader(http.StatusOK)
				return
			}
		}

		next.ServeHTTP(w, r)
	})
}

func itemsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if r.URL.Path == "/items" {
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(items); err != nil {
			log.Println("Error encoding items:", err)
		}
		return
	}

	if strings.HasPrefix(r.URL.Path, "/items/") {
		idStr := strings.TrimPrefix(r.URL.Path, "/items/")

		for _, item := range items {
			id, err := strconv.Atoi(idStr)
			if err != nil {
				http.Error(w, "Invalid item ID", http.StatusBadRequest)
				return
			}

			if id%3 == 0 {
				http.Error(w, "Access forbidden for this item", http.StatusForbidden)
				return
			}

			if item.ID == id {
				w.Header().Set("Content-Type", "application/json")
				if err := json.NewEncoder(w).Encode(item); err != nil {
					log.Println("Error encoding item:", err)
				}
				return
			}
		}
	}

	http.NotFound(w, r)
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/items", itemsHandler)
	mux.HandleFunc("/items/", itemsHandler)

	log.Println("Server is running on port 3099")
	log.Fatal(http.ListenAndServe(":3099", enableCORS(mux)))
}
