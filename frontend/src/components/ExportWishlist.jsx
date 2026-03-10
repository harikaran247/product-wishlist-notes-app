import { Download, FileText, Share } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const ExportWishlist = () => {
  const { products } = useProducts();

  const exportToCSV = () => {
    const headers = ['Name', 'Price', 'Category', 'Priority', 'Status', 'Description'];
    const csvContent = [
      headers.join(','),
      ...products.map(product => [
        `"${product.name}"`,
        product.price,
        product.category,
        product.priority,
        product.isPurchased ? 'Purchased' : 'Pending',
        `"${product.description || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wishlist.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(products, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wishlist.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const shareWishlist = () => {
    const shareText = products.map(product => 
      `${product.name} - $${product.price} (${product.category})`
    ).join('\n');
    
    if (navigator.share) {
      navigator.share({
        title: 'My Wishlist',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Wishlist copied to clipboard!');
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={exportToCSV}
        className="btn-secondary flex items-center space-x-1 text-sm"
        title="Export as CSV"
      >
        <Download className="h-4 w-4" />
        <span>CSV</span>
      </button>
      
      <button
        onClick={exportToJSON}
        className="btn-secondary flex items-center space-x-1 text-sm"
        title="Export as JSON"
      >
        <FileText className="h-4 w-4" />
        <span>JSON</span>
      </button>
      
      <button
        onClick={shareWishlist}
        className="btn-secondary flex items-center space-x-1 text-sm"
        title="Share Wishlist"
      >
        <Share className="h-4 w-4" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default ExportWishlist;