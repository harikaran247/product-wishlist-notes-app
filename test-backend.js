const axios = require('axios');

async function testBackend() {
  try {
    const response = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Backend is running:', response.data);
  } catch (error) {
    console.log('❌ Backend is not running. Please start it with: cd backend && npm run dev');
    console.log('Error:', error.message);
  }
}

testBackend();