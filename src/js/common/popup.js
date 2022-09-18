import { Report } from 'notiflix/build/notiflix-report-aio';
import Notiflix from 'notiflix';

export default setTimeout(() => {
  Report.info(
    'The method of viewing search',
    'Now you\'ll use infinite scrolling. If you want to change this method, you can click on the cog and select "Load more"',
    'Okay'
  );
}, 1000);

Notiflix.Report.init({
  width: '300px',
  svgSize: '50px',
  info: { buttonBackground: 'rgba(75, 92, 165, 0.5)' },
});
