export const helpers = {
    filterBySearch: (items, searchTerm, key = 'name') => {
        if (!searchTerm) return items;
        return items.filter(item =>
            item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    },

    formatDate: (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    }
};
