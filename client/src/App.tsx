import { Routes, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';
import SinglePage from './pages/SinglePage';
import { SortAndFilterProvider } from "./providers";

function App() {
  return (
      <SortAndFilterProvider>
        <Routes>
          <Route path="/" element={<ListPage />}/>
          <Route path="/:id" element={<SinglePage />} />
        </Routes>
      </SortAndFilterProvider>
  );
}

export default App;
