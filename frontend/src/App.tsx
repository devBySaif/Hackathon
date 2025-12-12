import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const startDownload = async () => {
    setLoading(true);
    addLog('Starting download process...');
    try {
      // লোকালহোস্ট API কল করা হচ্ছে
      const res = await axios.post('http://localhost:3000/v1/download/start', {
        file_id: 70000
      });
      addLog(`Success! Message: ${res.data.message}`);
      addLog(`Processing Time: ${res.data.processingTimeMs}ms`);
    } catch (err: any) {
      addLog(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Micro-Ops Download Manager</h1>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={startDownload} disabled={loading} style={{ padding: '10px 20px', fontSize: '16px' }}>
          {loading ? 'Processing...' : 'Start Long Download'}
        </button>
      </div>
      
      <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', height: '300px', overflowY: 'auto', textAlign: 'left' }}>
        <h3>Activity Log:</h3>
        {log.map((l, i) => <div key={i} style={{ fontFamily: 'monospace' }}>{l}</div>)}
      </div>
    </div>
  );
}

export default App;