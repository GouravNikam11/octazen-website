import GenericCRUD from '../../components/admin/GenericCRUD';

const CATS = ['Mobile Development','Web Development','Backend','AI & Innovation','Cloud','Design','DevOps'];
const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
  { name: 'content', label: 'Content (HTML or Markdown)', type: 'textarea' },
  { name: 'category', label: 'Category', type: 'select', options: CATS, default: 'Mobile Development' },
  { name: 'tags', label: 'Tags (comma-separated)', type: 'array' },
  { name: 'readTime', label: 'Read Time (minutes)', type: 'number', default: 5 },
  { name: 'thumbnail', label: 'Thumbnail URL' },
  { name: 'isPublished', label: 'Published', type: 'checkbox', default: false, checkLabel: 'Publish this post' },
];
const columns = [
  { key: 'title', label: 'Title', className: 'text-white font-medium' },
  { key: 'category', label: 'Category', badge: () => 'bg-blue-500/10 text-blue-400' },
  { key: 'readTime', label: 'Read Time', render: v => `${v} min` },
  { key: 'views', label: 'Views', className: 'text-gray-500' },
  { key: 'isPublished', label: 'Status', badge: v => v ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400', render: v => v ? 'Published' : 'Draft' },
];

export default function AdminBlog() {
  return <GenericCRUD title="Blog Post" endpoint="/blog" fields={fields} columns={columns} />;
}
