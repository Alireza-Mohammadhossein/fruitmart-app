const mockApi = {
  getStockLevels: async () => {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
    return {
      apple: 6,
      orange: 1,
      mango: 0,
    };
  }
};

export default mockApi;
