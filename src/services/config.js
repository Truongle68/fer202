export const formatDate = (dateString) => {
    if (!dateString)
        return "N/A";

    const parts = dateString.split(/[-/]/);

    if (parts.length === 3 && parts[2].length === 4) {
        const [day, month, year] = parts;
        return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-GB");
    }

    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString("en-GB");
};

export const formatDateForInput = (dateString) => {
    if (!dateString) return ''; 
    const parts = dateString.split(/[-/]/);

    // Neu la dd/MM/yyyy format
    if (parts.length === 3 && parts[2].length === 4) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Neu la yyyy-MM-dd format
    if (parts.length === 3 && parts[0].length === 4) {
        return dateString;
    }

    return ''; // Tra ve empty string neu khong nhan biet duoc date format
};
