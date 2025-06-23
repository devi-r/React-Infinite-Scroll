# React Infinite Scroll Table

A React application demonstrating infinite scroll functionality using a custom `useInfiniteScroll` hook with Intersection Observer API.

## Features

- **Infinite Scroll**: Automatically loads more data when user reaches the end of the table
- **Custom Hook**: `useInfiniteScroll` hook using Intersection Observer API
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during data loading
- **Performance Optimized**: Efficient rendering with proper cleanup

## Technologies Used

- React 18
- Custom Hooks
- Intersection Observer API
- CSS3 with modern styling

## Project Structure

```
src/
├── hooks/
│   └── useInfiniteScroll.js    # Custom infinite scroll hook
├── App.js                      # Main application component
├── App.css                     # Styling for the application
└── index.js                    # Application entry point
```

## How It Works

### useInfiniteScroll Hook

The custom hook uses the Intersection Observer API to detect when a target element comes into view:

```javascript
const { targetRef, isLoading } = useInfiniteScroll(loadMoreItems, {
  enabled: hasMore,
  rootMargin: '100px'
});
```

**Parameters:**
- `callback`: Function to execute when intersection is detected
- `options`: Configuration object for the Intersection Observer

**Returns:**
- `targetRef`: Ref to attach to the intersection target element
- `isIntersecting`: Boolean indicating if target is in view
- `isLoading`: Boolean indicating loading state

### Data Loading

The application simulates an API call with:
- 20 items loaded per batch
- 500ms delay to simulate network request
- Maximum of 1000 items (for demo purposes)

### Table Structure

The table displays:
- **ID Column**: Sequential numbers (0 to n)
- **Item Name Column**: "Item 0" to "Item n"

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/devi-r/React-Infinite-Scroll.git
cd React-Infinite-Scroll
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Scroll Down**: Simply scroll down the page to trigger automatic loading
2. **Loading Indicator**: Watch for the "Loading more items..." message
3. **End State**: When all items are loaded, you'll see "No more items to load"

## Customization

### Modifying the Hook

You can customize the `useInfiniteScroll` hook by passing different options:

```javascript
const { targetRef, isLoading } = useInfiniteScroll(loadMoreItems, {
  rootMargin: '200px',    // Trigger 200px before intersection
  threshold: 0.5,         // Trigger when 50% of target is visible
  enabled: true           // Enable/disable the observer
});
```

### Changing Data Source

Replace the simulated data loading with real API calls:

```javascript
const loadMoreItems = useCallback(async () => {
  const response = await fetch(`/api/items?page=${page}&limit=20`);
  const newItems = await response.json();
  setItems(prev => [...prev, ...newItems]);
}, [page]);
```

## Browser Support

This application uses the Intersection Observer API, which is supported in:
- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 15+

For older browsers, consider using a polyfill like `intersection-observer`.

## Performance Considerations

- **Debouncing**: The hook prevents multiple simultaneous calls
- **Cleanup**: Proper cleanup of Intersection Observer on component unmount
- **Efficient Rendering**: Uses React's useCallback for stable references

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Intersection Observer API documentation
- React Hooks documentation
- Modern CSS techniques for styling
