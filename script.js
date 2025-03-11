document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-item-form');
    const itemsDiv = document.getElementById('items');

    
    fetchItems();
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const expiry = document.getElementById('expiry').value;

        if (name && expiry) {
            try {
                const response = await fetch('http://localhost:3003/api/canneditems', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, expiry }),
                });

                if (response.ok) {
                    fetchItems();
                    form.reset(); 
                } else {
                    console.error('Failed to add canned item');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });


    async function fetchItems() {
        try {
            const response = await fetch('http://localhost:3003/api/canneditems');
            const data = await response.json();
            const itemsHtml = data.map((item) => {
                return `
                    <div class="item">
                        <h3>${item.name}</h3>
                        <p>Expiry Date: ${item.expiry}</p>
                    </div>
                `;
            }).join('');
            itemsDiv.innerHTML = itemsHtml;
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }
});
