import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/components/header.css';
import '../styles/components/hero.css';
import '../styles/components/about.css';
import '../styles/components/work.css';
import '../styles/components/featured.css';
import '../styles/components/projects.css';
import '../styles/components/contact.css';
import '../styles/components/footer.css';
import '../styles/components/mobile-nav.css';
import '../styles/components/topButton.css';

import '../styles/utils.css';

import mobileNavigation from './utils/mobile-nav';
import darkMode from './utils/dark-mode';
import topButton from './utils/top-button';

mobileNavigation();
darkMode();
topButton();