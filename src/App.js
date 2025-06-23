import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Simulate loading more data
  const loadMoreItems = useCallback(async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setItems((prev) => {
      const newItems = [...prev];
      for (let i = prev.length; i < prev.length + 10; i++) {
        newItems.push({
          id: i,
          name: `Item ${i}`,
        });
      }
      return newItems;
    });
  }, []);

  // Initialize with first batch of items
  useEffect(() => {
    loadMoreItems();
  }, [loadMoreItems]);

  // Stop loading after 100 items (for demo purposes)
  useEffect(() => {
    if (items.length >= 100) {
      setHasMore(false);
    }
  }, [items]);

  const { targetRef, isLoading } = useInfiniteScroll(loadMoreItems, {
    enabled: hasMore,
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Infinite Scroll Table</h1>
        <p>Scroll down to load more items automatically</p>
      </header>

      <main className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Intersection Observer target */}
        {hasMore && (
          <div
            ref={targetRef}
            className="intersection-target"
            style={{ height: "20px", margin: "20px 0" }}
          ></div>
        )}
        {isLoading && (
          <div className="loading-indicator">Loading more items...</div>
        )}
        {!hasMore && <div className="end-message">No more items to load</div>}
      </main>
    </div>
  );
}

export default App;
