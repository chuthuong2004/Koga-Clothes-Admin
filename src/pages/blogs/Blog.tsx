import { BlogTable, StatsBlog } from './components';
const Brand = () => {
  return (
    <div className="h-full flex-col flex gap-12">
      <StatsBlog />
      <BlogTable />
    </div>
  );
};

export default Brand;
