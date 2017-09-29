import api from '@/service/http';

const companyMap = JSON.parse(sessionStorage.getItem('_COMPANY_KEY'));
const id = companyMap ? companyMap.companyInfo.companyId : '';

export default {
  getStockGroupByCompanyId() {
    return api.post('/equity/findAllWithGroup', { companyId: id }).then(resp => resp.data);
  },
  getStockListByCompanyId() {
    return api.post('/equity/findAll', { companyId: id }).then(resp => resp.data);
  },
  addStock(params) {
    return api.put('/equity/add', params);
  },
  getPercent(num, total) {
    const number = parseFloat(num);
    const totals = parseFloat(total);
    if (isNaN(number) || isNaN(totals)) {
      return '-';
    }
    if (totals < 0) {
      return '0%';
    }
    const rate = Math.round((number / totals) * 100000) / 1000.00;
    return `${rate}%`;
  },
  deleteStock(stockid) {
    return api.del(`/equity/deleteById/${stockid}`);
  },
  addStockList(params) {
    return api.put('/equity/addList', params);
  },
};
