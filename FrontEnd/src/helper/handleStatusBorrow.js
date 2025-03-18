const getStatus = (status) => {
  switch (status) {
    case 'waiting': return 'Chờ duyệt'
    case 'borrowed': return 'Đang mượn'
    case 'return': return 'Đã trả'
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case 'waiting': return 'btn btn-status btn-warning'
    case 'borrowed': return 'btn btn-status btn-primary'
    case 'return': return 'btn btn-status btn-success disabled'
  }
};

export const statusHandler = {
  getStatus,
  getStatusClass,
};
