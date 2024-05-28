document.getElementById('propertyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const place = document.getElementById('place').value;
    const area = document.getElementById('area').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;
    const hospitals = document.getElementById('hospitals').checked;
    const colleges = document.getElementById('colleges').checked;
  
    try {
      await axios.post('/seller/property', { place, area, bedrooms, bathrooms, hospitals, colleges });
      alert('Property posted successfully');
      document.getElementById('place').value = '';
      document.getElementById('area').value = '';
      document.getElementById('bedrooms').value = '';
      document.getElementById('bathrooms').value = '';
      document.getElementById('hospitals').checked = false;
      document.getElementById('colleges').checked = false;
      fetchProperties();
    } catch (error) {
      console.error(error);
      alert('Failed to post property');
    }
  });
  
  async function fetchProperties() {
    try {
      const response = await axios.get('/seller/properties');
      const properties = response.data;
      const propertiesList = document.getElementById('propertiesList');
      propertiesList.innerHTML = '';
      properties.forEach(property => {
        const li = document.createElement('li');
        li.textContent = `${property.place}, ${property.area}, ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms`;
        propertiesList.appendChild(li);
      });
    } catch (error) {
      console.error(error);
      alert('Failed to fetch properties');
    }
  }
  fetchProperties();