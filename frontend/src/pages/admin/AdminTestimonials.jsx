import GenericCRUD from '../../components/admin/GenericCRUD';

const fields = [
  { name: 'name', label: 'Client Name', required: true },
  { name: 'designation', label: 'Designation', required: true },
  { name: 'company', label: 'Company' },
  { name: 'content', label: 'Testimonial', type: 'textarea', required: true },
  { name: 'rating', label: 'Rating (1-5)', type: 'number', min: 1, max: 5, default: 5 },
  { name: 'order', label: 'Order', type: 'number', default: 0 },
  { name: 'isActive', label: 'Active', type: 'checkbox', default: true, checkLabel: 'Visible on website' },
];
const columns = [
  { key: 'name', label: 'Name', className: 'text-white font-medium' },
  { key: 'designation', label: 'Role', className: 'text-gray-400' },
  { key: 'company', label: 'Company', className: 'text-gray-500' },
  { key: 'rating', label: 'Rating', render: v => '⭐'.repeat(v) },
  { key: 'isActive', label: 'Active', badge: v => v ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400' },
];

export default function AdminTestimonials() {
  return <GenericCRUD title="Testimonials" endpoint="/testimonials" fields={fields} columns={columns} />;
}
