import BlogListPage from "@theme-original/BlogListPage";

export default function BlogListPageWrapper(props) {
  const { items } = props;

  // 將 sticky=true 的文章排在最上面
  const sortedItems = [...items].sort((a, b) => {
    const aSticky = a.content.frontMatter.sticky ? 1 : 0;
    const bSticky = b.content.frontMatter.sticky ? 1 : 0;
    if (aSticky !== bSticky) return bSticky - aSticky; // sticky 的排前面
    return (
      new Date(b.content.metadata.date) - new Date(a.content.metadata.date)
    ); // 其餘照日期
  });

  return <BlogListPage {...props} items={sortedItems} />;
}
