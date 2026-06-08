let activeAlertData = null;

async function fetchAlerts() {
  const container = document.getElementById('alertsContainer');
  if (!container) return; // Proteksyon kapag walang alerts section sa ginawang bagong page

  try {
    const response = await fetch('https://929-alerts.github.io/data/aip.json');
    const data = await response.json();
    const alerts = data.fire_alerts || [];
    
    container.innerHTML = '';

    // Reminder div block
    const reminderDiv = document.createElement('div');
    reminderDiv.style.cssText = "background: rgba(255, 42, 42, 0.1); border: 1px solid var(--primary-red); padding: 12px; border-radius: 10px; margin-bottom: 5px; font-size: 0.75rem; color: #ff9999; text-align: center; line-height: 1.4;";
    reminderDiv.innerHTML = "<b>REMINDER:</b> Alerts may be late to service. Please check the latest info in official group chats.";
    container.appendChild(reminderDiv);

    if (alerts.length === 0) {
      const noAlerts = document.createElement('div');
      noAlerts.style.cssText = "text-align:center; padding:20px; opacity:0.5;";
      noAlerts.innerText = "No active alerts found.";
      container.appendChild(noAlerts);
      return;
    }

    alerts.forEach(alert => {
      const div = document.createElement('div');
      div.className = 'alert-card';
      div.onclick = () => openModal(alert);
      div.innerHTML = `
        <h3>${alert.alert_type}</h3>
        <p><b>Loc:</b> ${alert.location}</p>
        <p><b>Involved:</b> ${alert.involved}</p>
        <p><b>Status:</b> ${alert.status}</p>
      `;
      container.appendChild(div);
    });
  } catch (e) {
    container.innerHTML = '<div style="color:red; text-align:center; padding:20px;"> Alerts is currently undergoing improvements and system upgrades to provide a more professional, reliable, and better experience for everyone. Error syncing data.</div>';
  }
}

function openModal(alert) {
  activeAlertData = alert;
  const modalDetails = document.getElementById('modalDetails');
  const detailsModal = document.getElementById('detailsModal');
  
  if (modalDetails && detailsModal) {
    modalDetails.innerHTML = `
      <p><b>ALERT CODE:</b> ${alert.alert_code}</p>
      <p><b>TYPE:</b> ${alert.alert_type}</p>
      <p><b>LOCATION:</b> ${alert.location}</p>
      <p><b>INVOLVED:</b> ${alert.involved}</p>
      <p><b>STATUS:</b> ${alert.status}</p>
      <p><b>DATE/TIME:</b> ${alert.date_time}</p>
      <p style="margin-top:15px; color:#aaa; font-style:italic;"><b>NOTES:</b> ${alert.notes || 'No additional notes provided.'}</p>
    `;
    detailsModal.style.display = 'flex';
  }
}

function closeModal() {
  const detailsModal = document.getElementById('detailsModal');
  if (detailsModal) detailsModal.style.display = 'none';
}

function getFormattedText() {
  return `🚨929-ALERTS!\nType: ${activeAlertData.alert_type}\nLoc: ${activeAlertData.location}\nInvolved: ${activeAlertData.involved}\nStatus: ${activeAlertData.status}\nTime: ${activeAlertData.date_time}\n\nSource: 929-fire.github.io/org.ph/`;
}

// Hintayin mag-load ang elements mula sa global layout bago i-bind ang buttons
document.addEventListener("DOMContentLoaded", () => {
  const closeModalBtn = document.getElementById('closeModalBtn');
  const copyBtn = document.getElementById('copyBtn');
  const shareBtn = document.getElementById('shareBtn');

  if (closeModalBtn) closeModalBtn.onclick = closeModal;
  
  if (copyBtn) {
    copyBtn.onclick = () => {
      if (!activeAlertData) return;
      navigator.clipboard.writeText(getFormattedText());
      alert("Alert details copied to clipboard!");
    };
  }

  if (shareBtn) {
    shareBtn.onclick = () => {
      if (!activeAlertData) return;
      if (navigator.share) {
        navigator.share({ title: '929 Emergency Alert', text: getFormattedText() });
      } else {
        alert("Sharing is not supported on this browser. Try copying the info instead.");
      }
    };
  }

  fetchAlerts();
  setInterval(fetchAlerts, 60000); // 1-minute auto-refresh
});