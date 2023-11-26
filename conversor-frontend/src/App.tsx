// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
// import Settings from './components/settings';
// import RtlLayout from './components/RtlLayout';

// ----------------------------------------------------------------------

export default function App() {

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
