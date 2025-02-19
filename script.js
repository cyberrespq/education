// เปลี่ยนเป็นปีปัจจุบัน อัติโนมัติ
document.addEventListener('DOMContentLoaded', function() {
  const currentYear = new Date().getFullYear(); // ดึงปีปัจจุบัน
  document.getElementById('currentYear').textContent = currentYear; // ใส่ปีลงใน span
});


document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.sidebar-nav > li > a'); // เลือกเฉพาะลิงก์ในเมนู
  const currentPage = window.location.pathname; // ใช้ pathname ของ URL ปัจจุบัน

  // หา <a> ที่ href ตรงกับหน้าใน currentPage
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (currentPage.includes(linkHref)) { // ใช้ includes เพื่อเปรียบเทียบ URL
      // ล้าง active ก่อนเพิ่มใหม่
      document.querySelectorAll('.sidebar-nav > li').forEach(li => li.classList.remove('active'));
      link.parentElement.classList.add('active'); // เพิ่ม active ให้กับลิงก์ที่ตรงกับ URL
    }
  });

  // เพิ่ม Event Listener ให้กับทุกลิงก์
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // ล้าง active ออกจากทุกลิงก์
      document.querySelectorAll('.sidebar-nav > li').forEach(li => li.classList.remove('active'));

      // เพิ่ม active ให้กับลิงก์ที่คลิก
      link.parentElement.classList.add('active');

      // บันทึกหน้าที่เลือกใน localStorage
      localStorage.setItem('currentPage', link.getAttribute('href'));

      // ป้องกันการเปิดแท็บใหม่โดยไม่ได้ตั้งใจ
      if (link.getAttribute('target') === '_blank') {
        e.preventDefault();
        window.location.href = link.getAttribute('href');
      }
    });
  });

  // ตรวจสอบและบังคับลบ target="_blank" จากทุกลิงก์ในเมนู
  navLinks.forEach(link => {
    link.removeAttribute('target');
  });
});