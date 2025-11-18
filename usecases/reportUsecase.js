class ReportUsecase {
    constructor({orderRepository}) {
        this.orderRepository = orderRepository
    }

    async getDashboard() {
        // TODO: logika ambil data dashboard
        return {
            totalRevenue: 1000000,
            totalOrders: 50,
            totalCustomers: 20,
            totalServices: 10,
        };
    }

    async getRevenue(from, to) {
        // TODO: query db berdasarkan date range
        return [
            {date: "2025-11-01", revenue: 50000},
            {date: "2025-11-02", revenue: 75000},
        ];
    }

    async getOrders(from, to) {
        // 🔹 Ambil data dari repository
        const orders = await this.orderRepository.getOrdersByDateRange(from, to);

        // 🔹 Mapping data jika perlu (contoh format respons)
        return orders.map(order => ({
            orderId: order.id,
            customer: order.Customer.full_name,
            total: order.total_amount,
            date: order.order_date,
        }));
    }

    async getCustomers() {
        // TODO: query db
        return [
            {id: 1, name: "John Doe", email: "john@example.com"},
            {id: 2, name: "Jane Doe", email: "jane@example.com"},
        ];
    }

    async getServices() {
        // TODO: query db
        return [
            {id: 1, name: "Laundry", price: 20000},
            {id: 2, name: "Dry Cleaning", price: 50000},
        ];
    }

    async getInventory() {
        // TODO: query db
        return [
            {id: 1, item: "Detergent", stock: 100},
            {id: 2, item: "Fabric Softener", stock: 50},
        ];
    }

    async getExpenses(from, to) {
        // TODO: query db
        return [
            {date: "2025-11-01", expense: 20000, description: "Electricity"},
            {date: "2025-11-02", expense: 15000, description: "Water"},
        ];
    }

    async getProfitLoss(from, to) {
        // TODO: hitung revenue - expenses
        return [
            {date: "2025-11-01", profit: 30000},
            {date: "2025-11-02", profit: 60000},
        ];
    }
}

module.exports = new ReportUsecase();
