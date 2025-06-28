
export const processReconciliationData = (internalData, providerData) => {
  const results = [];
  const internalMap = new Map();
  const providerMap = new Map();
  
  internalData.forEach(item => {
    internalMap.set(item.transaction_id, item);
  });
  
  providerData.forEach(item => {
    providerMap.set(item.transaction_id, item);
  });
  
  internalData.forEach(internalItem => {
    const providerItem = providerMap.get(internalItem.transaction_id);
    
    if (!providerItem) {
      results.push({
        ...internalItem,
        provider_amount: null,
        provider_items: null,
        status: 'missing_in_provider',
        amount_difference: internalItem.amount,
        items_difference: internalItem.items_sold
      });
    } else {
      const amountDiff = internalItem.amount - providerItem.amount;
      const itemsDiff = internalItem.items_sold - providerItem.items_sold;
      
      let status = 'matched';
      if (Math.abs(amountDiff) >= 0.01 && Math.abs(itemsDiff) > 0) {
        status = 'discrepancy';
      } else if (Math.abs(amountDiff) >= 0.01) {
        status = 'discrepancy';
      } else if (Math.abs(itemsDiff) > 0) {
        status = 'items_discrepancy';
      }
      
      results.push({
        ...internalItem,
        provider_amount: providerItem.amount,
        provider_items: providerItem.items_sold,
        status,
        amount_difference: amountDiff,
        items_difference: itemsDiff
      });
    }
  });
  
  providerData.forEach(providerItem => {
    if (!internalMap.has(providerItem.transaction_id)) {
      results.push({
        transaction_id: providerItem.transaction_id,
        items_sold: null,
        amount: null,
        date: providerItem.date,
        provider_amount: providerItem.amount,
        provider_items: providerItem.items_sold,
        status: 'missing_in_internal',
        amount_difference: -providerItem.amount,
        items_difference: -providerItem.items_sold
      });
    }
  });
  
  return results;
};

export const calculateStatistics = (reconciliationResults) => {
  const matched = reconciliationResults.filter(r => r.status === 'matched').length;
  const discrepancies = reconciliationResults.filter(r => 
    r.status === 'discrepancy' || r.status === 'items_discrepancy'
  ).length;
  const missing = reconciliationResults.filter(r => 
    r.status === 'missing_in_provider' || r.status === 'missing_in_internal'
  ).length;
  const totalAmount = reconciliationResults.reduce((sum, r) => sum + (r.amount || 0), 0);
  
  return { matched, discrepancies, missing, totalAmount, total: reconciliationResults.length };
};

export const exportToCSV = (reconciliationResults) => {
  const headers = [
    'Transaction ID', 
    'Internal Items', 
    'Provider Items', 
    'Items Difference', 
    'Internal Amount', 
    'Provider Amount', 
    'Amount Difference', 
    'Status', 
    'Date'
  ];
  
  const csvData = reconciliationResults.map(row => [
    row.transaction_id,
    row.items_sold || '',
    row.provider_items || '',
    row.items_difference,
    row.amount || '',
    row.provider_amount || '',
    row.amount_difference.toFixed(2),
    row.status,
    row.date || ''
  ]);
  
  const csvContent = [headers, ...csvData]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'reconciliation_results.csv');
  link.click();
  URL.revokeObjectURL(url);
};