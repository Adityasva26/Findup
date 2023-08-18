import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('6013702354');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
