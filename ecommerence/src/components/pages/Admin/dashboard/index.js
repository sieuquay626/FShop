import FeaturedInfo from '../../../elements/featuredInfo/FeaturedInfo';
import Topbar from '../../../elements/TopbarAdmin';
import Chart from '../../../elements/chart';
import Sidebar from '../../../elements/SidebarAdmin';
import WidgetLg from '../../../elements/WidgetLg';
import WidgetSm from '../../../elements/WidgetSm';
import { userData } from '../../../../dummyData';
const DashBoardPage = () => {
  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart
        data={userData}
        title='User Analytics'
        grid
        dataKey='Active User'
      />
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default DashBoardPage;
