import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// DỮ LIỆU MẪU
// ─────────────────────────────────────────────
const INITIAL_QUESTIONS = [
  { id:1,  content:"Tế bào là đơn vị cơ bản cấu tạo nên mọi sinh vật. Phát biểu nào sau đây ĐÚNG?", a:"Tế bào chỉ có trong cơ thể động vật", b:"Mọi sinh vật đều được cấu tạo từ một hoặc nhiều tế bào", c:"Vi khuẩn không có cấu tạo tế bào", d:"Tế bào thực vật không có màng tế bào", correct:"b", subject:"KHTN", grade:"6", lesson:"Bài 1 – Tế bào", week:"1", difficulty:"Dễ", note:"" },
  { id:2,  content:"Quang hợp là quá trình cây xanh hấp thụ ánh sáng để tổng hợp chất hữu cơ. Sản phẩm của quang hợp gồm:", a:"CO₂ và nước", b:"Glucose và oxy", c:"Tinh bột và CO₂", d:"Oxy và nước", correct:"b", subject:"KHTN", grade:"6", lesson:"Bài 5 – Quang hợp ở thực vật", week:"3", difficulty:"Dễ", note:"" },
  { id:3,  content:"Trong tế bào thực vật, bào quan nào có chứa diệp lục và thực hiện quang hợp?", a:"Ti thể", b:"Không bào", c:"Lục lạp", d:"Ribosome", correct:"c", subject:"KHTN", grade:"6", lesson:"Bài 2 – Cấu tạo tế bào thực vật", week:"2", difficulty:"Trung bình", note:"" },
  { id:4,  content:"Hô hấp tế bào giải phóng năng lượng từ chất hữu cơ. Nguyên liệu chính của hô hấp tế bào là:", a:"Nước và CO₂", b:"Oxy và nước", c:"Glucose và oxy", d:"Tinh bột và glucose", correct:"c", subject:"KHTN", grade:"7", lesson:"Bài 8 – Hô hấp tế bào", week:"5", difficulty:"Trung bình", note:"" },
  { id:5,  content:"Máu gồm hai thành phần chính là huyết tương và tế bào máu. Tế bào máu nào có chức năng vận chuyển oxy?", a:"Bạch cầu", b:"Tiểu cầu", c:"Hồng cầu", d:"Plasma", correct:"c", subject:"KHTN", grade:"7", lesson:"Bài 12 – Máu và hệ tuần hoàn", week:"8", difficulty:"Dễ", note:"" },
  { id:6,  content:"Thụ phấn là quá trình chuyển hạt phấn từ nhị đến nhụy. Hình thức thụ phấn nhờ gió thường gặp ở loài nào?", a:"Hoa hồng", b:"Hoa lúa", c:"Hoa cúc", d:"Hoa lan", correct:"b", subject:"KHTN", grade:"7", lesson:"Bài 16 – Sinh sản hữu tính ở thực vật", week:"11", difficulty:"Trung bình", note:"" },
  { id:7,  content:"Trong khí quyển Trái Đất, khí nào chiếm tỉ lệ cao nhất?", a:"Oxy (O₂)", b:"Carbon dioxide (CO₂)", c:"Nitơ (N₂)", d:"Argon (Ar)", correct:"c", subject:"KHTN", grade:"8", lesson:"Bài 3 – Không khí và sự cháy", week:"3", difficulty:"Dễ", note:"" },
  { id:8,  content:"Phản ứng hóa học nào xảy ra khi đốt cháy hoàn toàn khí metan (CH₄)?", a:"CH₄ + O₂ → CO + H₂O", b:"CH₄ + 2O₂ → CO₂ + 2H₂O", c:"CH₄ + O₂ → C + 2H₂O", d:"2CH₄ + O₂ → 2CO + 4H₂", correct:"b", subject:"KHTN", grade:"8", lesson:"Bài 6 – Phản ứng hóa học", week:"6", difficulty:"Khó", note:"Cần cân bằng phương trình" },
  { id:9,  content:"Áp suất khí quyển ở mực nước biển có giá trị xấp xỉ bằng bao nhiêu?", a:"760 mmHg", b:"1000 mmHg", c:"500 mmHg", d:"300 mmHg", correct:"a", subject:"KHTN", grade:"8", lesson:"Bài 10 – Áp suất khí quyển", week:"9", difficulty:"Trung bình", note:"" },
  { id:10, content:"Tổng các góc trong của một tam giác bằng bao nhiêu độ?", a:"90°", b:"120°", c:"180°", d:"360°", correct:"c", subject:"Toán", grade:"6", lesson:"Chương III – Góc và hình học phẳng", week:"10", difficulty:"Dễ", note:"" },
  { id:11, content:"Ước chung lớn nhất (ƯCLN) của 36 và 48 bằng bao nhiêu?", a:"6", b:"9", c:"12", d:"18", correct:"c", subject:"Toán", grade:"6", lesson:"Bài 13 – Ước chung và ƯCLN", week:"7", difficulty:"Trung bình", note:"" },
  { id:12, content:"Số nào sau đây là số nguyên tố?", a:"1", b:"9", c:"15", d:"17", correct:"d", subject:"Toán", grade:"6", lesson:"Bài 10 – Số nguyên tố và hợp số", week:"5", difficulty:"Dễ", note:"" },
  { id:13, content:"Cho tam giác vuông có hai cạnh góc vuông lần lượt là 3 cm và 4 cm. Cạnh huyền có độ dài bằng bao nhiêu?", a:"5 cm", b:"6 cm", c:"7 cm", d:"√7 cm", correct:"a", subject:"Toán", grade:"7", lesson:"Bài 17 – Định lý Pythagore", week:"8", difficulty:"Trung bình", note:"" },
  { id:14, content:"Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì quan hệ thế nào với nhau?", a:"Chéo nhau", b:"Song song với nhau", c:"Cắt nhau", d:"Trùng nhau", correct:"b", subject:"Toán", grade:"7", lesson:"Bài 5 – Hai đường thẳng song song", week:"3", difficulty:"Trung bình", note:"" },
  { id:15, content:"Phương trình bậc nhất một ẩn có dạng tổng quát là?", a:"ax² + bx + c = 0", b:"ax + b = 0 (a ≠ 0)", c:"ax = 0 (a ≠ 0)", d:"|ax| + b = 0", correct:"b", subject:"Toán", grade:"8", lesson:"Bài 1 – Phương trình bậc nhất một ẩn", week:"12", difficulty:"Trung bình", note:"" },
  { id:16, content:"Nghiệm của phương trình 2x − 6 = 0 là:", a:"x = −3", b:"x = 6", c:"x = 3", d:"x = 2", correct:"c", subject:"Toán", grade:"8", lesson:"Bài 1 – Phương trình bậc nhất một ẩn", week:"12", difficulty:"Dễ", note:"" },
  { id:17, content:"Bài thơ \"Nam quốc sơn hà\" tương truyền do ai sáng tác?", a:"Nguyễn Trãi", b:"Lý Thường Kiệt", c:"Trần Quốc Tuấn", d:"Lê Lợi", correct:"b", subject:"Ngữ văn", grade:"7", lesson:"Bài 7 – Thơ trung đại Việt Nam", week:"6", difficulty:"Trung bình", note:"" },
  { id:18, content:"\"Nam quốc sơn hà\" được viết theo thể thơ nào?", a:"Lục bát", b:"Song thất lục bát", c:"Thất ngôn tứ tuyệt Đường luật", d:"Ngũ ngôn tứ tuyệt", correct:"c", subject:"Ngữ văn", grade:"7", lesson:"Bài 7 – Thơ trung đại Việt Nam", week:"6", difficulty:"Trung bình", note:"" },
  { id:19, content:"Tác giả của truyện ngắn \"Lão Hạc\" là ai?", a:"Ngô Tất Tố", b:"Tô Hoài", c:"Nguyễn Công Hoan", d:"Nam Cao", correct:"d", subject:"Ngữ văn", grade:"8", lesson:"Bài 3 – Văn học hiện thực phê phán", week:"4", difficulty:"Dễ", note:"" },
  { id:20, content:"Trong đoạn trích \"Tức nước vỡ bờ\", chị Dậu đã làm gì để bảo vệ chồng?", a:"Chạy trốn cùng chồng", b:"Nhờ làng xóm can thiệp", c:"Đánh lại tên cai lệ và người nhà lý trưởng", d:"Đưa tiền hối lộ quan lại", correct:"c", subject:"Ngữ văn", grade:"8", lesson:"Bài 2 – Tức nước vỡ bờ", week:"3", difficulty:"Trung bình", note:"" },
  { id:21, content:"\"Truyện Kiều\" của Nguyễn Du được viết theo thể thơ nào?", a:"Thất ngôn bát cú", b:"Lục bát", c:"Song thất lục bát", d:"Tự do", correct:"b", subject:"Ngữ văn", grade:"9", lesson:"Bài 1 – Truyện Kiều – Nguyễn Du", week:"1", difficulty:"Dễ", note:"" },
  { id:22, content:"Which sentence uses the Simple Present Tense correctly?", a:"She go to school every day.", b:"She goes to school every day.", c:"She going to school every day.", d:"She goed to school every day.", correct:"b", subject:"Tiếng Anh", grade:"6", lesson:"Unit 3 – Simple Present Tense", week:"3", difficulty:"Dễ", note:"" },
  { id:23, content:"Choose the correct form: 'There _____ many books on the shelf.'", a:"is", b:"am", c:"are", d:"be", correct:"c", subject:"Tiếng Anh", grade:"6", lesson:"Unit 2 – There is / There are", week:"2", difficulty:"Dễ", note:"" },
  { id:24, content:"What is the past tense of the verb 'go'?", a:"goed", b:"goes", c:"gone", d:"went", correct:"d", subject:"Tiếng Anh", grade:"7", lesson:"Unit 5 – Past Simple Tense", week:"5", difficulty:"Dễ", note:"" },
  { id:25, content:"Choose the correct sentence in Past Simple: 'Yesterday, she _____ her homework.'", a:"do", b:"does", c:"did", d:"done", correct:"c", subject:"Tiếng Anh", grade:"7", lesson:"Unit 5 – Past Simple Tense", week:"5", difficulty:"Trung bình", note:"" },
  { id:26, content:"Chiến thắng lịch sử Điện Biên Phủ năm 1954 kết thúc cuộc kháng chiến chống thực dân nào?", a:"Đế quốc Anh", b:"Đế quốc Mỹ", c:"Thực dân Pháp", d:"Phát xít Nhật", correct:"c", subject:"Lịch sử & Địa lí", grade:"9", lesson:"Bài 7 – Kháng chiến chống Pháp", week:"7", difficulty:"Dễ", note:"" },
  { id:27, content:"Đồng bằng nào có diện tích lớn nhất Việt Nam?", a:"Đồng bằng sông Hồng", b:"Đồng bằng sông Cửu Long", c:"Đồng bằng ven biển miền Trung", d:"Đồng bằng Bắc Bộ mở rộng", correct:"b", subject:"Lịch sử & Địa lí", grade:"8", lesson:"Bài 4 – Địa hình Việt Nam", week:"4", difficulty:"Dễ", note:"" },
  { id:28, content:"Thủ đô Hà Nội nằm bên bờ sông nào?", a:"Sông Đáy", b:"Sông Đà", c:"Sông Hồng", d:"Sông Thái Bình", correct:"c", subject:"Lịch sử & Địa lí", grade:"6", lesson:"Bài 1 – Vị trí địa lí Việt Nam", week:"1", difficulty:"Dễ", note:"" },
  { id:29, content:"Sông nào dài nhất chảy qua lãnh thổ Việt Nam?", a:"Sông Đà", b:"Sông Mê Kông (Cửu Long)", c:"Sông Hồng", d:"Sông Mã", correct:"b", subject:"Lịch sử & Địa lí", grade:"8", lesson:"Bài 5 – Sông ngòi Việt Nam", week:"5", difficulty:"Trung bình", note:"" },
  { id:30, content:"Cách mạng tháng Tám năm 1945 thành công, nước Việt Nam Dân chủ Cộng hòa được thành lập vào ngày tháng năm nào?", a:"19/8/1945", b:"2/9/1945", c:"30/4/1975", d:"1/1/1945", correct:"b", subject:"Lịch sử & Địa lí", grade:"9", lesson:"Bài 5 – Cách mạng tháng Tám 1945", week:"5", difficulty:"Dễ", note:"" },
];

const INITIAL_CONTESTS = [
  { id:1, name:"RCV – KHTN Lớp 7 Tuần 5–8",       subjects:["KHTN"],                      grades:["7"], questionIds:[4,5,6],         timePerQuestion:30, totalPlayers:28, mode:"individual", status:"ready", createdAt:"2025-03-10" },
  { id:2, name:"RCV – Toán Lớp 6 Số học",          subjects:["Toán"],                      grades:["6"], questionIds:[10,11,12,16],    timePerQuestion:40, totalPlayers:32, mode:"individual", status:"ready", createdAt:"2025-03-11" },
  { id:3, name:"RCV – Tổng hợp TA + Ngữ văn L7",   subjects:["Tiếng Anh","Ngữ văn"],       grades:["7"], questionIds:[17,18,24,25],    timePerQuestion:30, totalPlayers:30, mode:"individual", status:"ready", createdAt:"2025-03-12" },
  { id:4, name:"RCV – Đối kháng lớp KHTN + Toán",  subjects:["KHTN","Toán"],               grades:["6","7"], questionIds:[1,2,10,11,12,4,5], timePerQuestion:35, totalPlayers:0, mode:"team", teamList:["6A1","6A2","6A3","6A4","6A5","7A1","7A2","7A3","7A4","7A5"], status:"ready", createdAt:"2025-03-13" },
];

// Helper: lấy subject đại diện (dùng cho history/badge)
const primarySubject = c => (c.subjects || [c.subject])[0] || "KHTN";

const HISTORY = [
  { id:1, name:"RCV – Ngữ văn Lớp 8 Tuần 1",      subjects:["Ngữ văn"],                 grade:"8", createdAt:"2025-03-01", players:30, winner:"Nguyễn Thị Lan Anh", questionsPlayed:5, eliminated:28, status:"Đã kết thúc" },
  { id:2, name:"RCV – Lịch sử Lớp 9 HK2",          subjects:["Lịch sử & Địa lí"],       grade:"9", createdAt:"2025-03-05", players:25, winner:"Trần Văn Minh",       questionsPlayed:4, eliminated:24, status:"Đã kết thúc" },
  { id:3, name:"RCV – Tổng hợp KHTN + Toán L6",     subjects:["KHTN","Toán"],             grade:"6", createdAt:"2025-03-08", players:33, winner:"Lê Thị Hương Giang", questionsPlayed:6, eliminated:32, status:"Đã kết thúc" },
];

// Tạo danh sách số đeo
const genBibs = n => Array.from({length:n},(_,i)=>`Số ${String(i+1).padStart(2,"0")}`);

// ─────────────────────────────────────────────
// DANH SÁCH BÀI HỌC – KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
// ─────────────────────────────────────────────
const LESSONS = {
  "KHTN": {
    "6": [
      "Bài 1: Giới thiệu về Khoa học tự nhiên","Bài 2: An toàn trong phòng thực hành",
      "Bài 3: Các phép đo","Bài 4: Các thể của chất","Bài 5: Oxygen và không khí",
      "Bài 6: Một số vật liệu thông dụng","Bài 7: Hỗn hợp và chất tinh khiết",
      "Bài 8: Tách chất ra khỏi hỗn hợp","Bài 9: Tế bào – đơn vị cơ sở của sự sống",
      "Bài 10: Cấu tạo và chức năng các thành phần của tế bào",
      "Bài 11: Sự lớn lên và sinh sản của tế bào","Bài 12: Thực hành quan sát tế bào",
      "Bài 13: Từ tế bào đến cơ thể","Bài 14: Phân loại thế giới sống",
      "Bài 15: Thực vật","Bài 16: Động vật","Bài 17: Nấm","Bài 18: Virus",
      "Bài 19: Lực – Biểu diễn lực","Bài 20: Biến dạng của lò xo – Lực đàn hồi",
      "Bài 21: Lực hấp dẫn và trọng lực","Bài 22: Lực ma sát",
      "Bài 23: Năng lượng và cuộc sống","Bài 24: Bảo toàn năng lượng",
      "Bài 25: Trái Đất và bầu trời","Bài 26: Mặt Trăng","Bài 27: Hệ Mặt Trời",
    ],
    "7": [
      "Bài 1: Phương pháp và kĩ năng học tập môn KHTN",
      "Bài 2: Nguyên tử – Nguyên tố hoá học","Bài 3: Sơ lược bảng tuần hoàn các nguyên tố hoá học",
      "Bài 4: Phân tử – Đơn chất – Hợp chất","Bài 5: Giới thiệu về liên kết hoá học",
      "Bài 6: Hoá trị và công thức hoá học","Bài 7: Tốc độ của chuyển động",
      "Bài 8: Đồ thị quãng đường – thời gian","Bài 9: Gia tốc – Chuyển động đều và không đều",
      "Bài 10: Đo tốc độ","Bài 11: Âm thanh","Bài 12: Độ cao và độ to của âm",
      "Bài 13: Phản xạ âm và tiêu âm","Bài 14: Ánh sáng","Bài 15: Sự phản xạ ánh sáng",
      "Bài 16: Ảnh của vật qua gương phẳng","Bài 17: Trao đổi chất và chuyển hoá năng lượng",
      "Bài 18: Quang hợp ở thực vật","Bài 19: Hô hấp tế bào","Bài 20: Thực hành về quang hợp",
      "Bài 21: Trao đổi khí ở sinh vật","Bài 22: Vai trò của nước và các chất dinh dưỡng",
      "Bài 23: Vận chuyển chất trong cơ thể","Bài 24: Cảm ứng ở sinh vật",
      "Bài 25: Sinh sản ở sinh vật","Bài 26: Sinh trưởng và phát triển ở sinh vật",
      "Bài 27: Môi trường và các nhân tố sinh thái","Bài 28: Quần thể sinh vật",
      "Bài 29: Quần xã sinh vật","Bài 30: Hệ sinh thái",
    ],
    "8": [
      "Bài 1: Phản ứng hoá học","Bài 2: Mol và tính toán hoá học",
      "Bài 3: Nồng độ dung dịch","Bài 4: Acid – Base – pH – Oxide – Muối",
      "Bài 5: Một số hợp chất thông dụng","Bài 6: Pin và acquy",
      "Bài 7: Lực và chuyển động","Bài 8: Áp suất trong chất lỏng và khí",
      "Bài 9: Lực đẩy Archimedes","Bài 10: Moment lực – Đòn bẩy",
      "Bài 11: Năng lượng cơ học – Công và công suất","Bài 12: Nhiệt năng",
      "Bài 13: Nội năng và truyền nhiệt","Bài 14: Thực hành về nhiệt",
      "Bài 15: Hệ thần kinh","Bài 16: Các giác quan",
      "Bài 17: Nội tiết và sinh sản ở người","Bài 18: Miễn dịch và vắc-xin",
      "Bài 19: Dinh dưỡng và tiêu hoá ở người","Bài 20: Hô hấp ở người",
      "Bài 21: Tuần hoàn máu","Bài 22: Bài tiết và cân bằng môi trường trong",
      "Bài 23: Sinh thái học – Con người và thiên nhiên","Bài 24: Bảo vệ môi trường",
    ],
    "9": [
      "Bài 1: Kim loại – Phi kim","Bài 2: Sơ lược về bảng tuần hoàn",
      "Bài 3: Hydrocarbon","Bài 4: Ethanol","Bài 5: Acetic acid","Bài 6: Lipid",
      "Bài 7: Carbohydrate","Bài 8: Protein và enzyme","Bài 9: Polymer",
      "Bài 10: Điện từ học – Từ trường","Bài 11: Lực từ – Động cơ điện",
      "Bài 12: Cảm ứng điện từ – Máy phát điện","Bài 13: Điện xoay chiều",
      "Bài 14: Năng lượng điện","Bài 15: Khúc xạ ánh sáng","Bài 16: Thấu kính – Mắt",
      "Bài 17: Di truyền học – ADN","Bài 18: Gene và biểu hiện gene",
      "Bài 19: Nhiễm sắc thể và di truyền","Bài 20: Biến dị và đột biến",
      "Bài 21: Tiến hoá","Bài 22: Sinh thái và bảo vệ môi trường",
    ],
  },
  "Toán": {
    "6": [
      "Bài 1: Tập hợp và phần tử","Bài 2: Tập hợp các số tự nhiên",
      "Bài 3: Phép cộng và phép trừ số tự nhiên","Bài 4: Phép nhân và phép chia số tự nhiên",
      "Bài 5: Luỹ thừa với số mũ tự nhiên","Bài 6: Thứ tự thực hiện phép tính",
      "Bài 7: Tính chất chia hết","Bài 8: Dấu hiệu chia hết cho 2 và 5",
      "Bài 9: Dấu hiệu chia hết cho 3 và 9","Bài 10: Số nguyên tố và hợp số",
      "Bài 11: Phân tích một số ra thừa số nguyên tố","Bài 12: ƯCLN và BCNN",
      "Bài 13: Số nguyên","Bài 14: Tập hợp các số nguyên – Thứ tự",
      "Bài 15: Phép cộng và trừ số nguyên","Bài 16: Phép nhân số nguyên",
      "Bài 17: Phân số – So sánh phân số","Bài 18: Phép cộng và trừ phân số",
      "Bài 19: Phép nhân và chia phân số","Bài 20: Hỗn số – Số thập phân",
      "Bài 21: Tỉ số và tỉ lệ thức","Bài 22: Một số bài toán về tỉ số",
      "Bài 23: Tam giác","Bài 24: Góc và đường thẳng","Bài 25: Diện tích hình chữ nhật và hình vuông",
      "Bài 26: Diện tích tam giác","Bài 27: Hình tròn – Chu vi và diện tích",
    ],
    "7": [
      "Bài 1: Số hữu tỉ","Bài 2: Cộng trừ số hữu tỉ","Bài 3: Nhân chia số hữu tỉ",
      "Bài 4: Luỹ thừa của số hữu tỉ","Bài 5: Tỉ lệ thức","Bài 6: Một số bài toán về tỉ lệ thức",
      "Bài 7: Số vô tỉ – Số thực","Bài 8: Làm tròn số",
      "Bài 9: Biểu đồ thống kê","Bài 10: Xác suất thực nghiệm",
      "Bài 11: Đường thẳng song song","Bài 12: Góc so le trong – Đồng vị",
      "Bài 13: Định lý về tổng ba góc của tam giác","Bài 14: Tam giác bằng nhau",
      "Bài 15: Các trường hợp bằng nhau của tam giác","Bài 16: Định lý Pythagore",
      "Bài 17: Tam giác cân","Bài 18: Quan hệ về cạnh và góc trong tam giác",
      "Bài 19: Đường đồng quy trong tam giác",
      "Bài 20: Biểu thức đại số","Bài 21: Đa thức","Bài 22: Cộng trừ đa thức",
      "Bài 23: Nhân đa thức","Bài 24: Hằng đẳng thức đáng nhớ",
    ],
    "8": [
      "Bài 1: Nhân đa thức – Hằng đẳng thức","Bài 2: Phân tích đa thức thành nhân tử",
      "Bài 3: Phân thức đại số","Bài 4: Cộng trừ phân thức",
      "Bài 5: Nhân chia phân thức","Bài 6: Biến đổi biểu thức hữu tỉ",
      "Bài 7: Phương trình bậc nhất một ẩn","Bài 8: Giải bài toán bằng cách lập phương trình",
      "Bài 9: Bất phương trình bậc nhất một ẩn",
      "Bài 10: Tứ giác","Bài 11: Hình thang","Bài 12: Hình bình hành",
      "Bài 13: Hình chữ nhật – Hình thoi – Hình vuông","Bài 14: Đa giác đều",
      "Bài 15: Diện tích đa giác","Bài 16: Hình lăng trụ đứng","Bài 17: Hình chóp đều",
      "Bài 18: Thống kê – Bảng tần số","Bài 19: Biểu đồ tần số",
      "Bài 20: Xác suất và biến cố","Bài 21: Tính xác suất của biến cố",
    ],
    "9": [
      "Bài 1: Căn bậc hai","Bài 2: Căn bậc ba","Bài 3: Biến đổi căn thức",
      "Bài 4: Hàm số bậc nhất","Bài 5: Đồ thị hàm số bậc nhất",
      "Bài 6: Hệ phương trình bậc nhất hai ẩn","Bài 7: Giải hệ phương trình",
      "Bài 8: Giải bài toán bằng lập hệ phương trình",
      "Bài 9: Hàm số bậc hai","Bài 10: Đồ thị hàm số bậc hai",
      "Bài 11: Phương trình bậc hai một ẩn","Bài 12: Hệ thức Viète",
      "Bài 13: Giải bài toán bằng phương trình bậc hai",
      "Bài 14: Góc ở tâm – Cung","Bài 15: Góc nội tiếp","Bài 16: Đường tròn ngoại tiếp",
      "Bài 17: Hình trụ","Bài 18: Hình nón","Bài 19: Hình cầu",
      "Bài 20: Thống kê và xác suất nâng cao",
    ],
  },
  "Ngữ văn": {
    "6": [
      "Bài 1: Tôi và các bạn (Văn bản tự sự)","Bài 2: Gõ cửa trái tim (Thơ lục bát)",
      "Bài 3: Yêu thương và chia sẻ (Truyện ngắn)","Bài 4: Quê hương yêu dấu (Thơ)",
      "Bài 5: Những nẻo đường xứ sở (Văn miêu tả)","Bài 6: Chuyện kể về những người anh hùng",
      "Bài 7: Thế giới cổ tích (Truyện cổ tích)","Bài 8: Khác biệt và gần gũi",
      "Bài 9: Trái đất – Ngôi nhà chung","Bài 10: Cuốn sách tôi yêu (Nghị luận văn học)",
    ],
    "7": [
      "Bài 1: Bầu trời tuổi thơ (Thơ)","Bài 2: Khúc nhạc tâm hồn (Tùy bút)",
      "Bài 3: Cội nguồn yêu thương (Truyện)","Bài 4: Giai điệu đất nước (Thơ trữ tình)",
      "Bài 5: Màu sắc trăm miền (Tản văn)","Bài 6: Bài học cuộc sống (Nghị luận)",
      "Bài 7: Thế giới viễn tưởng (Truyện khoa học viễn tưởng)",
      "Bài 8: Trải nghiệm để trưởng thành (Văn bản thông tin)",
      "Bài 9: Hòa điệu với tự nhiên (Thơ – Văn xuôi)",
      "Bài 10: Mẹ thiên nhiên (Tổng kết)",
    ],
    "8": [
      "Bài 1: Những gương mặt thân yêu (Truyện)","Bài 2: Những câu hát dân gian về vẻ đẹp quê hương",
      "Bài 3: Lời sông núi (Thơ trung đại – yêu nước)","Bài 4: Tiếng cười trào phúng trong thơ",
      "Bài 5: Những tình huống khó xử (Truyện cười)","Bài 6: Chân dung cuộc sống (Văn xuôi hiện đại)",
      "Bài 7: Tin yêu và hy vọng (Thơ hiện đại)","Bài 8: Nhìn về vốn văn hoá dân tộc",
      "Bài 9: Hịch – Cáo (Thể loại cổ)","Bài 10: Cùng suy ngẫm và thực hành tạo lập văn bản",
    ],
    "9": [
      "Bài 1: Những hiểu biết về thơ","Bài 2: Những tình cảm cao đẹp",
      "Bài 3: Hành trang vào đời","Bài 4: Khám phá bản thân",
      "Bài 5: Tình yêu Tổ quốc (Thơ – Văn xuôi)","Bài 6: Một thời đau thương và anh dũng",
      "Bài 7: Thế giới văn học đặc sắc","Bài 8: Tiếng nói của văn nghệ",
      "Bài 9: Con người trong cuộc đời","Bài 10: Tôi và người khác",
    ],
  },
  "Tiếng Anh": {
    "6": [
      "Unit 1: My new school",
      "Unit 1 – Getting started","Unit 1 – A closer look 1","Unit 1 – A closer look 2","Unit 1 – Communication","Unit 1 – Skills 1","Unit 1 – Skills 2","Unit 1 – Looking back & Project",
      "Unit 2: My house",
      "Unit 2 – Getting started","Unit 2 – A closer look 1","Unit 2 – A closer look 2","Unit 2 – Communication","Unit 2 – Skills 1","Unit 2 – Skills 2","Unit 2 – Looking back & Project",
      "Unit 3: My friends",
      "Unit 3 – Getting started","Unit 3 – A closer look 1","Unit 3 – A closer look 2","Unit 3 – Communication","Unit 3 – Skills 1","Unit 3 – Skills 2",
      "Unit 4: My neighbourhood",
      "Unit 4 – Getting started","Unit 4 – A closer look 1","Unit 4 – A closer look 2","Unit 4 – Communication","Unit 4 – Skills 1","Unit 4 – Skills 2",
      "Unit 5: Natural wonders of Viet Nam",
      "Unit 5 – Getting started","Unit 5 – A closer look 1","Unit 5 – A closer look 2","Unit 5 – Communication","Unit 5 – Skills 1","Unit 5 – Skills 2",
      "Review 1 (Units 1–3)","Review 2 (Units 4–6)",
      "Unit 6: Our Tet holiday",
      "Unit 7: Television",
      "Unit 8: Sports and games",
      "Unit 9: Cities of the world",
      "Unit 10: Our houses in the future",
      "Unit 11: Our greener world",
      "Unit 12: Robots",
      "Review 3 (Units 7–9)","Review 4 (Units 10–12)",
    ],
    "7": [
      "Unit 1: Hobbies",
      "Unit 1 – Getting started","Unit 1 – A closer look 1","Unit 1 – A closer look 2","Unit 1 – Communication","Unit 1 – Skills 1","Unit 1 – Skills 2","Unit 1 – Looking back & Project",
      "Unit 2: Health",
      "Unit 2 – Getting started","Unit 2 – A closer look 1","Unit 2 – A closer look 2","Unit 2 – Communication","Unit 2 – Skills 1","Unit 2 – Skills 2",
      "Unit 3: Community service",
      "Unit 3 – Getting started","Unit 3 – A closer look 1","Unit 3 – A closer look 2","Unit 3 – Communication","Unit 3 – Skills 1","Unit 3 – Skills 2",
      "Unit 4: Music and arts",
      "Unit 4 – Getting started","Unit 4 – A closer look 1","Unit 4 – A closer look 2","Unit 4 – Communication","Unit 4 – Skills 1","Unit 4 – Skills 2",
      "Unit 5: Vietnamese food and drink",
      "Unit 5 – Getting started","Unit 5 – A closer look 1","Unit 5 – A closer look 2","Unit 5 – Communication","Unit 5 – Skills 1","Unit 5 – Skills 2",
      "Review 1 (Units 1–3)","Review 2 (Units 4–6)",
      "Unit 6: The first University in Viet Nam",
      "Unit 7: Traffic",
      "Unit 8: Films",
      "Unit 9: Festivals around the world",
      "Unit 10: Sources of energy",
      "Unit 11: Travelling in the future",
      "Unit 12: An overcrowded world",
      "Review 3 (Units 7–9)","Review 4 (Units 10–12)",
    ],
    "8": [
      "Unit 1: Leisure activities",
      "Unit 1 – Getting started","Unit 1 – A closer look 1","Unit 1 – A closer look 2","Unit 1 – Communication","Unit 1 – Skills 1","Unit 1 – Skills 2","Unit 1 – Looking back & Project",
      "Unit 2: Life in the countryside",
      "Unit 2 – Getting started","Unit 2 – A closer look 1","Unit 2 – A closer look 2","Unit 2 – Communication","Unit 2 – Skills 1","Unit 2 – Skills 2",
      "Unit 3: Teenagers",
      "Unit 3 – Getting started","Unit 3 – A closer look 1","Unit 3 – A closer look 2","Unit 3 – Communication","Unit 3 – Skills 1","Unit 3 – Skills 2",
      "Unit 4: Our customs and traditions",
      "Unit 4 – Getting started","Unit 4 – A closer look 1","Unit 4 – A closer look 2","Unit 4 – Communication","Unit 4 – Skills 1","Unit 4 – Skills 2",
      "Unit 5: Technology",
      "Unit 5 – Getting started","Unit 5 – A closer look 1","Unit 5 – A closer look 2","Unit 5 – Communication","Unit 5 – Skills 1","Unit 5 – Skills 2",
      "Review 1 (Units 1–3)","Review 2 (Units 4–6)",
      "Unit 6: Folk tales",
      "Unit 7: Pollution",
      "Unit 8: English-speaking countries",
      "Unit 9: Natural disasters",
      "Unit 10: Communication",
      "Unit 11: Science and technology",
      "Unit 12: Life in the future",
      "Review 3 (Units 7–9)","Review 4 (Units 10–12)",
    ],
    "9": [
      "Unit 1: Local environment",
      "Unit 1 – Getting started","Unit 1 – A closer look 1","Unit 1 – A closer look 2","Unit 1 – Communication","Unit 1 – Skills 1","Unit 1 – Skills 2","Unit 1 – Looking back & Project",
      "Unit 2: City life",
      "Unit 2 – Getting started","Unit 2 – A closer look 1","Unit 2 – A closer look 2","Unit 2 – Communication","Unit 2 – Skills 1","Unit 2 – Skills 2",
      "Unit 3: English – an important language",
      "Unit 3 – Getting started","Unit 3 – A closer look 1","Unit 3 – A closer look 2","Unit 3 – Communication","Unit 3 – Skills 1","Unit 3 – Skills 2",
      "Unit 4: Life in the past",
      "Unit 4 – Getting started","Unit 4 – A closer look 1","Unit 4 – A closer look 2","Unit 4 – Communication","Unit 4 – Skills 1","Unit 4 – Skills 2",
      "Unit 5: Wonders of Viet Nam",
      "Unit 5 – Getting started","Unit 5 – A closer look 1","Unit 5 – A closer look 2","Unit 5 – Communication","Unit 5 – Skills 1","Unit 5 – Skills 2",
      "Review 1 (Units 1–3)","Review 2 (Units 4–6)",
      "Unit 6: Viet Nam – then and now",
      "Unit 7: Recipes and eating habits",
      "Unit 8: Tourism",
      "Unit 9: English-speaking countries",
      "Unit 10: Space exploration",
      "Unit 11: Changing roles in society",
      "Unit 12: My future career",
      "Review 3 (Units 7–9)","Review 4 (Units 10–12)",
    ],
  },
  "Lịch sử & Địa lí": {
    "6": [
      "Bài 1: Lịch sử là gì?","Bài 2: Dựa vào đâu để biết lịch sử?",
      "Bài 3: Thời gian trong lịch sử","Bài 4: Nguồn gốc loài người",
      "Bài 5: Xã hội nguyên thuỷ","Bài 6: Sự chuyển biến và phân hoá của xã hội nguyên thuỷ",
      "Bài 7: Ai Cập cổ đại","Bài 8: Trung Quốc từ thời cổ đại đến thế kỉ VII",
      "Bài 9: Hy Lạp và La Mã cổ đại","Bài 10: Các vương quốc phong kiến Đông Nam Á",
      "Bài 11: Vị trí địa lí, phạm vi phân bố các châu lục",
      "Bài 12: Trái Đất trong hệ Mặt Trời","Bài 13: Vận động của Trái Đất",
      "Bài 14: Cấu tạo của Trái Đất","Bài 15: Thạch quyển – Núi lửa – Động đất",
      "Bài 16: Thuỷ quyển","Bài 17: Khí quyển","Bài 18: Thời tiết và khí hậu",
      "Bài 19: Biến đổi khí hậu","Bài 20: Thiên nhiên châu Phi – châu Mỹ",
    ],
    "7": [
      "Bài 1: Tây Âu từ thế kỉ V đến thế kỉ XIV","Bài 2: Trung Quốc từ thế kỉ VII đến thế kỉ XIX",
      "Bài 3: Ấn Độ từ thế kỉ IV đến thế kỉ XIX","Bài 4: Đông Nam Á từ thế kỉ VII đến thế kỉ XIX",
      "Bài 5: Các cuộc phát kiến địa lí","Bài 6: Sự hình thành quan hệ sản xuất TBCN",
      "Bài 7: Cách mạng tư sản Anh và Mĩ","Bài 8: Cách mạng Pháp",
      "Bài 9: Châu Âu và nước Mĩ cuối TK XVIII – đầu TK XX",
      "Bài 10: Châu Á cuối TK XIX – đầu TK XX",
      "Bài 11: Địa lí tự nhiên châu Á","Bài 12: Dân cư và đô thị hoá châu Á",
      "Bài 13: Kinh tế châu Á","Bài 14: Đông Nam Á – tự nhiên và dân cư",
      "Bài 15: Kinh tế Đông Nam Á – ASEAN",
    ],
    "8": [
      "Bài 1: Chiến tranh thế giới thứ nhất","Bài 2: Cách mạng tháng Mười Nga",
      "Bài 3: Châu Âu và nước Mĩ giữa hai cuộc chiến","Bài 4: Phong trào độc lập dân tộc",
      "Bài 5: Chiến tranh thế giới thứ hai","Bài 6: Trật tự thế giới sau 1945",
      "Bài 7: Chiến tranh lạnh","Bài 8: Thế giới từ 1991 đến nay",
      "Bài 9: Địa lí châu Âu","Bài 10: Liên minh châu Âu",
      "Bài 11: Địa lí châu Mĩ","Bài 12: Hoa Kì","Bài 13: Khu vực Mĩ La-tinh",
    ],
    "9": [
      "Bài 1: Cách mạng tháng Tám và nước Việt Nam DCCH (1945–1954)",
      "Bài 2: Kháng chiến toàn quốc chống Pháp","Bài 3: Chiến thắng Điện Biên Phủ",
      "Bài 4: Xây dựng miền Bắc – Đấu tranh thống nhất (1954–1965)",
      "Bài 5: Kháng chiến chống Mỹ (1965–1975)","Bài 6: Đại thắng mùa xuân 1975",
      "Bài 7: Đất nước thống nhất và đổi mới","Bài 8: Địa lí Việt Nam – Vị trí và lịch sử",
      "Bài 9: Đặc điểm tự nhiên Việt Nam","Bài 10: Dân số và đô thị hoá Việt Nam",
      "Bài 11: Kinh tế Việt Nam","Bài 12: Vùng kinh tế và phát triển bền vững",
    ],
  },
  "Tin học": {
    "6": [
      "Chủ đề 1: Thông tin và xử lí thông tin","Chủ đề 2: Máy tính và cộng đồng",
      "Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      "Chủ đề 4: Đạo đức, pháp luật và văn hoá trong môi trường số",
      "Chủ đề 5: Ứng dụng tin học – Soạn thảo văn bản","Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính",
      "Chủ đề 7: Hướng nghiệp với tin học","Chủ đề 8: Giới thiệu lập trình Scratch",
    ],
    "7": [
      "Chủ đề 1: Máy tính và xã hội tri thức","Chủ đề 2: Mạng máy tính và Internet",
      "Chủ đề 3: Tổ chức lưu trữ và bảo mật thông tin","Chủ đề 4: Đạo đức và văn hoá số",
      "Chủ đề 5: Bảng tính điện tử","Chủ đề 6: Thuật toán và lập trình",
      "Chủ đề 7: Lập trình trực quan – Scratch nâng cao","Chủ đề 8: Tin học với nghề nghiệp",
    ],
    "8": [
      "Chủ đề 1: Máy tính và công nghệ số","Chủ đề 2: Internet và thế giới số",
      "Chủ đề 3: An toàn thông tin","Chủ đề 4: Đạo đức số nâng cao",
      "Chủ đề 5: Phần mềm đồ hoạ và trình chiếu","Chủ đề 6: Cơ sở dữ liệu",
      "Chủ đề 7: Lập trình Python cơ bản","Chủ đề 8: Dự án tin học",
    ],
    "9": [
      "Chủ đề 1: Mạng xã hội và truyền thông số","Chủ đề 2: An ninh mạng",
      "Chủ đề 3: Pháp luật trong không gian số","Chủ đề 4: Trình chiếu và xử lí video",
      "Chủ đề 5: Quản trị cơ sở dữ liệu","Chủ đề 6: Lập trình Python nâng cao",
      "Chủ đề 7: Nhập môn trí tuệ nhân tạo","Chủ đề 8: Nghề nghiệp liên quan đến tin học",
    ],
  },
  "GDCD": {
    "6": [
      "Bài 1: Tự hào về truyền thống dân tộc","Bài 2: Yêu thương con người",
      "Bài 3: Siêng năng và kiên trì","Bài 4: Tôn trọng sự thật",
      "Bài 5: Tự lập","Bài 6: Biết ơn","Bài 7: Công dân nước Cộng hoà XHCN Việt Nam",
      "Bài 8: Quyền và nghĩa vụ cơ bản của công dân",
      "Bài 9: Sống có đạo đức và tuân theo pháp luật",
    ],
    "7": [
      "Bài 1: Tự hào về truyền thống quê hương","Bài 2: Quan tâm, cảm thông và chia sẻ",
      "Bài 3: Học tập tự giác, tích cực","Bài 4: Giữ chữ tín",
      "Bài 5: Bảo tồn di sản văn hoá","Bài 6: Phòng chống bạo lực học đường",
      "Bài 7: Quyền và nghĩa vụ học tập","Bài 8: Phòng ngừa tai nạn vũ khí, chất nổ",
      "Bài 9: Quyền và nghĩa vụ lao động của công dân",
    ],
    "8": [
      "Bài 1: Tôn trọng sự đa dạng của các dân tộc","Bài 2: Tôn trọng lẽ phải",
      "Bài 3: Lao động cần cù và sáng tạo","Bài 4: Bảo vệ lẽ phải",
      "Bài 5: Bảo vệ môi trường và tài nguyên thiên nhiên",
      "Bài 6: Xây dựng tình bạn trong sáng","Bài 7: Phòng, chống tệ nạn xã hội",
      "Bài 8: Lập kế hoạch chi tiêu","Bài 9: Phòng ngừa tai nạn vũ khí nổ",
    ],
    "9": [
      "Bài 1: Lí tưởng sống của thanh niên","Bài 2: Nhà nước Việt Nam",
      "Bài 3: Công dân với sự nghiệp xây dựng và bảo vệ Tổ quốc",
      "Bài 4: Quyền dân chủ của công dân","Bài 5: Vi phạm pháp luật và trách nhiệm",
      "Bài 6: Quyền tham gia quản lí nhà nước","Bài 7: Hệ thống chính trị Việt Nam",
      "Bài 8: Nghĩa vụ bảo vệ Tổ quốc",
    ],
  },
  "Công nghệ": {
    "6": [
      "Bài 1: Nhà ở đối với con người","Bài 2: Kiến trúc nhà ở","Bài 3: Vật liệu xây dựng",
      "Bài 4: Ngôi nhà thông minh","Bài 5: Trang trí nhà ở",
      "Bài 6: Sắp xếp đồ đạc trong nhà","Bài 7: Giữ gìn nhà ở sạch đẹp",
      "Bài 8: An toàn trong gia đình","Bài 9: Nấu ăn trong gia đình",
      "Bài 10: Bảo quản và chế biến thực phẩm","Bài 11: Thực hành: Chế biến món ăn",
    ],
    "7": [
      "Bài 1: Giới thiệu về trồng trọt","Bài 2: Đất trồng và phân bón",
      "Bài 3: Giống cây trồng","Bài 4: Kĩ thuật trồng trọt",
      "Bài 5: Phòng trừ sâu bệnh","Bài 6: Thu hoạch và bảo quản nông sản",
      "Bài 7: Giới thiệu về chăn nuôi","Bài 8: Giống vật nuôi",
      "Bài 9: Thức ăn và phòng bệnh cho vật nuôi","Bài 10: Nuôi thuỷ sản",
    ],
    "8": [
      "Bài 1: Vẽ kĩ thuật và tiêu chuẩn","Bài 2: Bản vẽ kĩ thuật cơ bản",
      "Bài 3: Mối ghép và truyền động","Bài 4: Vật liệu kĩ thuật",
      "Bài 5: Công nghệ cắt gọt kim loại","Bài 6: Vai trò của điện năng",
      "Bài 7: An toàn điện","Bài 8: Mạng điện trong nhà",
      "Bài 9: Thiết bị điện trong nhà","Bài 10: Lắp đặt mạng điện đơn giản",
    ],
    "9": [
      "Bài 1: Giới thiệu nghề nghiệp kĩ thuật","Bài 2: Nghề điện dân dụng",
      "Bài 3: Nghề cơ khí chế tạo","Bài 4: Nghề công nghệ thông tin",
      "Bài 5: Nghề nông nghiệp","Bài 6: Thực hành nghề",
    ],
  },
  "GD địa phương": {
    "6": ["Chủ đề 1: Lịch sử địa phương","Chủ đề 2: Địa lí địa phương","Chủ đề 3: Văn hoá địa phương","Chủ đề 4: Kinh tế địa phương"],
    "7": ["Chủ đề 1: Di tích lịch sử địa phương","Chủ đề 2: Danh lam thắng cảnh","Chủ đề 3: Phong tục tập quán","Chủ đề 4: Phát triển bền vững địa phương"],
    "8": ["Chủ đề 1: Nhân vật lịch sử địa phương","Chủ đề 2: Môi trường địa phương","Chủ đề 3: Nghề truyền thống","Chủ đề 4: Văn học địa phương"],
    "9": ["Chủ đề 1: Định hướng nghề nghiệp địa phương","Chủ đề 2: Kinh tế – xã hội địa phương","Chủ đề 3: Bảo tồn văn hoá","Chủ đề 4: Xây dựng quê hương"],
  },
  "Hoạt động TN": {
    "6": ["Hoạt động 1: Khám phá bản thân","Hoạt động 2: Trách nhiệm với bản thân","Hoạt động 3: Gia đình thân yêu","Hoạt động 4: Nhà trường – Thầy cô – Bạn bè","Hoạt động 5: Quê hương em"],
    "7": ["Hoạt động 1: Em với gia đình","Hoạt động 2: Em với nhà trường","Hoạt động 3: Em với cộng đồng","Hoạt động 4: Em với nghề nghiệp","Hoạt động 5: Em với môi trường"],
    "8": ["Hoạt động 1: Phát triển bản thân","Hoạt động 2: Xây dựng mối quan hệ","Hoạt động 3: Khám phá nghề nghiệp","Hoạt động 4: Tham gia xây dựng cộng đồng","Hoạt động 5: Bảo vệ môi trường"],
    "9": ["Hoạt động 1: Định hướng nghề nghiệp","Hoạt động 2: Kĩ năng sống tự lập","Hoạt động 3: Tham gia hoạt động xã hội","Hoạt động 4: Chuẩn bị cho tương lai","Hoạt động 5: Tổng kết THCS"],
  },
};

const getLessons = (subject, grade) => LESSONS[subject]?.[grade] || [];

const SUBJECTS = [
  "KHTN", "Toán", "Ngữ văn", "Tiếng Anh", "Lịch sử & Địa lí",
  "Tin học", "GDCD", "Công nghệ", "GD địa phương", "Hoạt động TN",
];
const GRADES      = ["6","7","8","9"];
const DIFFICULTIES= ["Dễ","Trung bình","Khó"];
const SMETA = {
  "KHTN":             {emoji:"🔬",color:"#2563EB",bg:"#DBEAFE",dark:"#1D4ED8"},
  "Toán":             {emoji:"📐",color:"#D97706",bg:"#FEF3C7",dark:"#B45309"},
  "Ngữ văn":          {emoji:"📖",color:"#7C3AED",bg:"#EDE9FE",dark:"#6D28D9"},
  "Tiếng Anh":        {emoji:"🌐",color:"#059669",bg:"#D1FAE5",dark:"#047857"},
  "Lịch sử & Địa lí": {emoji:"🗺️",color:"#DC2626",bg:"#FEE2E2",dark:"#B91C1C"},
  "Tin học":          {emoji:"💻",color:"#0891B2",bg:"#CFFAFE",dark:"#0E7490"},
  "GDCD":             {emoji:"⚖️",color:"#65A30D",bg:"#ECFCCB",dark:"#4D7C0F"},
  "Công nghệ":        {emoji:"⚙️",color:"#9333EA",bg:"#F3E8FF",dark:"#7E22CE"},
  "GD địa phương":    {emoji:"🏡",color:"#EA580C",bg:"#FFEDD5",dark:"#C2410C"},
  "Hoạt động TN":     {emoji:"🌱",color:"#0D9488",bg:"#CCFBF1",dark:"#0F766E"},
};

// ─────────── DEFAULT SCHOOL INFO ────────────
const INITIAL_SCHOOL_INFO = {
  schoolName:   "THCS Lý Tự Trọng",
  schoolType:   "THCS",
  ward:         "Phường Long Hoa",
  province:     "Tây Ninh",
  logo:         "🏫",
  teacherName:  "Huỳnh Thị Thùy Dương",
  teacherTitle: "Giáo viên",
  teacherBadge: "Gemini Educator",
  subjects:     "KHTN",
  phone:        "0976793038",
  email:        "",
  schoolYear:   "2024–2025",
  semester:     "2",
};

// ─────────── LOCALSTORAGE ────────────
const LS_KEY = "rcv_data_v2";
const LS_KEYS_KEY = "rcv_api_keys"; // separate storage for keys
const lsSave = d => { try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch(e){} };
const lsLoad = () => { try { const r = localStorage.getItem(LS_KEY); return r ? JSON.parse(r) : null; } catch(e){ return null; } };

// ── API Key helpers ──
const loadApiKeys = () => { try { return JSON.parse(localStorage.getItem(LS_KEYS_KEY)||"{}"); } catch(e){ return {}; } };
const saveApiKeys = k => { try { localStorage.setItem(LS_KEYS_KEY, JSON.stringify(k)); } catch(e){} };
const getAnthropicKey = () => loadApiKeys().anthropic || "";
const getGeminiKey    = () => loadApiKeys().gemini    || "";

// ── Unified AI call with Gemini fallback ──
// Usage: await callAI({ prompt, system, maxTokens })
// Returns raw text string. Throws on total failure.
const callAI = async ({ prompt, system = "", maxTokens = 2000 }) => {
  const anthropicKey = getAnthropicKey();
  const geminiKey    = getGeminiKey();

  // ── Try Claude first ──
  const tryAnthropic = async (key) => {
    const headers = {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    };
    if (key) headers["x-api-key"] = key;
    const body = { model: "claude-sonnet-4-20250514", max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }] };
    if (system) body.system = system;
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers, body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      const msg = data.error?.message || `HTTP ${res.status}`;
      const code = data.error?.type || "";
      if (res.status === 429 || res.status === 529 || code.includes("rate") || code.includes("overload"))
        throw { rateLimited: true, msg };
      if (res.status === 401 || res.status === 403)
        throw new Error(`401: ${msg}`); // triggers fallback
      throw new Error(msg);
    }
    return data.content?.map(b => b.text || "").join("").trim() || "";
  };

  // ── Gemini fallback ──
  const tryGemini = async (key) => {
    if (!key) throw new Error("Không có Gemini API Key");
    const model = "gemini-2.0-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const fullPrompt = system ? `${system}\n\n${prompt}` : prompt;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 },
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message || "Lỗi Gemini API");
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
  };

  // ── Strategy: Claude → Gemini fallback ──
  let lastError = null;
  try {
    return await tryAnthropic(anthropicKey);
  } catch(e) {
    lastError = e;
    const shouldFallback = e.rateLimited ||
      (e.message && (e.message.includes("401") || e.message.includes("403") ||
        e.message.toLowerCase().includes("auth") || e.message.toLowerCase().includes("invalid x-api-key") ||
        e.message.toLowerCase().includes("permission")));

    if (shouldFallback && geminiKey) {
      try { return await tryGemini(geminiKey); }
      catch(ge) { throw new Error(`Cả Claude và Gemini đều lỗi: ${ge.message}`); }
    }
    if (shouldFallback && !geminiKey) {
      throw new Error("Claude AI không xác thực được. Vui lòng nhập API Key trong Cài đặt → Ứng dụng → 🔑 Cấu hình AI.");
    }
    throw e;
  }
};

// ─────────── THEMES ────────────
const THEMES = [
  {
    id:"gold",   name:"Vàng & Xanh Navy",  emoji:"🏆",
    p1:"#FBBF24", p2:"#D97706", p3:"#FEF3C7",
    dark:"#1E3A5F", dark2:"#152C47",
    bg:"#EEF2F7", card:"#fff", border:"#E9EEF5",
    text:"#1E293B", sub:"#64748B",
    navHoverBg:"#FFFBEB", navHoverColor:"#C47A0A",
    sbTeacherBg:"#FFFBEB", sbTeacherBorder:"#FDE68A",
  },
  {
    id:"ocean",  name:"Xanh Biển",          emoji:"🌊",
    p1:"#38BDF8", p2:"#0284C7", p3:"#E0F2FE",
    dark:"#0C4A6E", dark2:"#075985",
    bg:"#F0F9FF", card:"#fff", border:"#BAE6FD",
    text:"#0C4A6E", sub:"#0369A1",
    navHoverBg:"#E0F2FE", navHoverColor:"#0284C7",
    sbTeacherBg:"#E0F2FE", sbTeacherBorder:"#7DD3FC",
  },
  {
    id:"forest", name:"Xanh Lá Rừng",       emoji:"🌿",
    p1:"#4ADE80", p2:"#16A34A", p3:"#DCFCE7",
    dark:"#14532D", dark2:"#15803D",
    bg:"#F0FDF4", card:"#fff", border:"#BBF7D0",
    text:"#14532D", sub:"#15803D",
    navHoverBg:"#DCFCE7", navHoverColor:"#16A34A",
    sbTeacherBg:"#DCFCE7", sbTeacherBorder:"#86EFAC",
  },
  {
    id:"violet", name:"Tím Hoa Cà",          emoji:"💜",
    p1:"#A78BFA", p2:"#7C3AED", p3:"#EDE9FE",
    dark:"#4C1D95", dark2:"#5B21B6",
    bg:"#F5F3FF", card:"#fff", border:"#DDD6FE",
    text:"#2E1065", sub:"#5B21B6",
    navHoverBg:"#EDE9FE", navHoverColor:"#7C3AED",
    sbTeacherBg:"#EDE9FE", sbTeacherBorder:"#C4B5FD",
  },
  {
    id:"rose",   name:"Hồng Đỏ",            emoji:"🌸",
    p1:"#FB7185", p2:"#E11D48", p3:"#FFE4E6",
    dark:"#881337", dark2:"#9F1239",
    bg:"#FFF1F2", card:"#fff", border:"#FECDD3",
    text:"#4C0519", sub:"#BE123C",
    navHoverBg:"#FFE4E6", navHoverColor:"#E11D48",
    sbTeacherBg:"#FFE4E6", sbTeacherBorder:"#FDA4AF",
  },
  {
    id:"slate",  name:"Ghi Tối (Dark)",      emoji:"🌙",
    p1:"#94A3B8", p2:"#64748B", p3:"#1E293B",
    dark:"#0F172A", dark2:"#1E293B",
    bg:"#0F172A", card:"#1E293B", border:"#334155",
    text:"#F1F5F9", sub:"#94A3B8",
    navHoverBg:"#334155", navHoverColor:"#F1F5F9",
    sbTeacherBg:"#1E293B", sbTeacherBorder:"#475569",
  },
];

const genThemeCSS = t => `
:root {
  --p1:${t.p1};--p2:${t.p2};--p3:${t.p3};
  --dark:${t.dark};--dark2:${t.dark2};
  --bg:${t.bg};--card:${t.card};--border:${t.border};
  --text:${t.text};--sub:${t.sub};
}
body{background:var(--bg)!important;color:var(--text)!important}
.sb,.tb,.card,.sc,.modal,.ai-modal,.hist-detail{background:var(--card)!important;border-color:var(--border)!important;color:var(--text)!important}
.sb{border-right-color:var(--border)!important}
.sb-logo,.sb-ft{border-color:var(--border)!important}
.nav-item{color:var(--sub)!important}
.nav-item:hover{background:${t.navHoverBg}!important;color:${t.navHoverColor}!important}
.nav-item.on{background:linear-gradient(135deg,var(--p1),var(--p2))!important;color:#fff!important;box-shadow:0 4px 12px rgba(0,0,0,.2)!important}
.sb-ico{background:linear-gradient(135deg,var(--p1),var(--p2))!important}
.nb-off{background:var(--p3)!important;color:var(--p2)!important}
.sb-teacher{background:var(--p3)!important;border-color:var(--p1)!important}
.btn-p{background:linear-gradient(135deg,var(--p1),var(--p2))!important}
.btn-d{background:linear-gradient(135deg,var(--dark),var(--dark2))!important}
.btn-g{background:var(--card)!important;border-color:var(--border)!important;color:var(--sub)!important}
.btn-g:hover{border-color:var(--p1)!important;color:var(--p2)!important}
.inp,.inp:focus{background:var(--card)!important;border-color:var(--border)!important;color:var(--text)!important}
.inp:focus{border-color:var(--p1)!important;box-shadow:0 0 0 3px ${t.p3}55!important}
.tb-title{color:var(--dark)!important}
.tb-date{background:var(--p3)!important;color:var(--sub)!important}
.tbl th{background:var(--p3)!important;color:var(--sub)!important;border-color:var(--border)!important}
.tbl td{border-color:var(--border)!important}
.tbl tr:hover td{background:${t.p3}88!important}
.sec-title{color:var(--sub)!important}
.divider{background:var(--border)!important}
.pt{background:var(--p3)!important}
.pf{background:linear-gradient(90deg,var(--p1),var(--p2))!important}
.step-i.done{color:var(--p2)!important}
.step-i.done .step-dot{border-color:var(--p2)!important;background:var(--p2)!important}
.qp:hover,.qp.picked{border-color:var(--p1)!important;background:${t.p3}99!important}
.qp.picked .qpb{background:var(--p2)!important;border-color:var(--p2)!important}
.rc.on,.class-count-chip:hover{border-color:var(--p2)!important;background:${t.p3}!important;color:var(--p2)!important}
.mode-btn.on{box-shadow:0 2px 8px rgba(0,0,0,.1)!important}
.subj-chip:hover{border-color:var(--p1)!important;background:${t.p3}99!important}
.cc:hover{border-color:var(--p1)!important}
.pt .pf{background:linear-gradient(90deg,var(--p1),var(--p2))!important}
.sp{background:linear-gradient(160deg,var(--dark),var(--dark2))!important}
.hb{background:var(--p3)!important;border-color:var(--p1)!important;color:var(--dark)!important}
.stab-bar{background:var(--p3)!important}
.stab.on{background:var(--card)!important;color:var(--text)!important}
.save-toast{background:#22C55E!important}
.xl-drop{background:var(--p3)!important;border-color:var(--border)!important}
.xl-drop:hover,.xl-drop.over{border-color:var(--p1)!important;background:${t.p3}99!important}
.mode-toggle{background:var(--p3)!important}
.class-builder{background:var(--p3)!important;border-color:var(--border)!important}
h1,h2,h3{color:var(--text)!important}
.empty{color:var(--sub)!important}
.label{color:var(--text)!important}
.hint{color:var(--sub)!important}
`;

// ─────────── SOUND ENGINE ────────────
let _actx = null;
const getACtx = () => {
  if (!_actx) { try { _actx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){} }
  return _actx;
};
const tone = (freq, dur, type="sine", vol=0.28, delay=0) => {
  try {
    const c = getACtx(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type = type; o.frequency.value = freq;
    const t = c.currentTime + delay;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.start(t); o.stop(t + dur + 0.01);
  } catch(e){}
};
const Sounds = {
  reveal:   () => { tone(440,.09); tone(554,.15,"sine",.22,.07); },
  correct:  () => { [523,659,784].forEach((f,i) => tone(f,.14,"sine",.27,i*.09)); },
  wrong:    () => { tone(220,.16,"square",.2); tone(165,.25,"square",.15,.12); },
  elim:     () => { tone(300,.1,"sawtooth",.18); tone(190,.2,"sawtooth",.14,.09); },
  nextQ:    () => { tone(660,.07); },
  timeWarn: () => { tone(880,.05,"square",.14); },
  timeEnd:  () => { [0,.1,.2].forEach(d => tone(440,.09,"square",.2,d)); },
  win:      () => { [523,659,784,1047].forEach((f,i)=>tone(f,.18,"sine",.3,i*.11)); },
  start:    () => { [392,494,587,784].forEach((f,i)=>tone(f,.12,"sine",.26,i*.09)); },
};

const Ic = {
  Home:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:17,height:17}}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  Bell:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:17,height:17}}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Book:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:17,height:17}}><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  Plus:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{width:17,height:17}}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Hist:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:17,height:17}}><polyline points="12,8 12,12 14,14"/><path d="M3.05 11a9 9 0 108.99-8c-4.65 0-8.56 3.31-8.99 8"/><polyline points="1,8 3.05,11 6,9"/></svg>,
  Cog:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:17,height:17}}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Search:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:15,height:15}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Edit:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  Play:()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:15,height:15}}><polygon points="5,3 19,12 5,21 5,3"/></svg>,
  X:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:17,height:17}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Chk:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:14,height:14}}><polyline points="20,6 9,17 4,12"/></svg>,
  Flt:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/></svg>,
  Pause:()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  Refresh:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{width:13,height:13}}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  Eye:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:15,height:15}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Trophy:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:16,height:16}}><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>,
  Vol:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:15,height:15}}><polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/><path d="M19.07 4.93a10 10 0 010 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>,
  VolOff:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:15,height:15}}><polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>,
  Download:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Upload:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Guide:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:15,height:15}}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeWidth="2.5"/></svg>,
};

// ─────────── BACKGROUND MUSIC ENGINE ────────────
let _bgMusic = null;
let _bgGain  = null;

const BgMusic = {
  start(ctx) {
    if (_bgMusic) return;
    try {
      const tempo = 128; // BPM
      const beat  = 60 / tempo;
      const loop  = () => {
        const now = ctx.currentTime;
        // Bass kick pattern
        const kick = (t) => {
          const osc = ctx.createOscillator(); const g = ctx.createGain();
          osc.connect(g); g.connect(_bgGain);
          osc.frequency.setValueAtTime(180, t); osc.frequency.exponentialRampToValueAtTime(40, t+.12);
          g.gain.setValueAtTime(.7, t); g.gain.exponentialRampToValueAtTime(.001, t+.18);
          osc.start(t); osc.stop(t+.2);
        };
        // Hi-hat
        const hat = (t, vol=.15) => {
          const buf = ctx.createBuffer(1,ctx.sampleRate*.05,ctx.sampleRate);
          const d = buf.getChannelData(0);
          for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1);
          const src = ctx.createBufferSource(); const f = ctx.createBiquadFilter(); const g = ctx.createGain();
          src.buffer=buf; f.type='highpass'; f.frequency.value=8000;
          src.connect(f); f.connect(g); g.connect(_bgGain);
          g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(.001,t+.05);
          src.start(t); src.stop(t+.06);
        };
        // Melody notes – pentatonic scale in A (excited, uplifting)
        const melody = [440,523,587,659,784,880,784,659,587,523,659,784];
        const mNote = (freq, t, dur, vol=.18) => {
          const osc = ctx.createOscillator(); const g = ctx.createGain();
          osc.type='triangle'; osc.connect(g); g.connect(_bgGain);
          osc.frequency.value=freq;
          g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+.03);
          g.gain.exponentialRampToValueAtTime(.001,t+dur*.9);
          osc.start(t); osc.stop(t+dur);
        };
        // Bass line
        const bass = [110,110,146,110,165,110,146,165];
        const bNote = (freq,t,dur) => {
          const osc = ctx.createOscillator(); const g = ctx.createGain();
          osc.type='sawtooth'; const flt = ctx.createBiquadFilter(); flt.type='lowpass'; flt.frequency.value=400;
          osc.connect(flt); flt.connect(g); g.connect(_bgGain);
          osc.frequency.value=freq;
          g.gain.setValueAtTime(.22,t); g.gain.exponentialRampToValueAtTime(.001,t+dur*.85);
          osc.start(t); osc.stop(t+dur);
        };

        const bars = 4;
        for(let b=0;b<bars*4;b++) {
          const t = now + b*beat;
          if(b%4===0||b%4===2) kick(t);
          hat(t, .08); hat(t+beat*.5, .05);
          bNote(bass[b%8], t, beat);
          if(b%3===0) mNote(melody[b%melody.length], t, beat*.9);
        }
        _bgMusic = setTimeout(loop, bars*4*beat*1000 - 100);
      };
      loop();
    } catch(e){}
  },
  stop() {
    if(_bgMusic) { clearTimeout(_bgMusic); _bgMusic=null; }
    if(_bgGain) { try { _bgGain.gain.exponentialRampToValueAtTime(.001, getACtx().currentTime+.5); } catch(e){} setTimeout(()=>{ _bgGain=null; },600); }
  },
  setVol(v) { if(_bgGain) _bgGain.gain.value=v; },
};

const startBgMusic = (vol=0.35) => {
  try {
    const ctx = getACtx(); if(!ctx) return;
    if(!_bgGain) { _bgGain = ctx.createGain(); _bgGain.gain.value=vol; _bgGain.connect(ctx.destination); }
    BgMusic.start(ctx);
  } catch(e){}
};


// ─────────── ROUNDS CONFIG ────────────
const DEFAULT_ROUNDS = [
  { id:1, name:"Khởi động",            emoji:"🚀", color:"#22C55E", bg:"rgba(34,197,94,.15)",  desc:"Câu hỏi nhận biết, ôn tập kiến thức cơ bản",          defaultTime:40, defaultCount:5  },
  { id:2, name:"Vượt chướng ngại vật", emoji:"⚡", color:"#F59E0B", bg:"rgba(245,158,11,.15)", desc:"Câu hỏi vận dụng, tư duy và phân tích",                defaultTime:30, defaultCount:5  },
  { id:3, name:"Tăng tốc",             emoji:"🔥", color:"#EF4444", bg:"rgba(239,68,68,.15)",  desc:"Câu hỏi khó hơn, đòi hỏi suy luận nhanh",             defaultTime:20, defaultCount:5  },
  { id:4, name:"Về đích",              emoji:"🏆", color:"#FBBF24", bg:"rgba(251,191,36,.15)", desc:"Câu hỏi tổng hợp cuối cùng để chọn người chiến thắng", defaultTime:15, defaultCount:3  },
];

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:15px}
body{font-family:'Be Vietnam Pro',sans-serif;background:#EEF2F7;color:#1E293B;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:10px}

/* ═══ WELCOME SCREEN ═══ */
.wl{position:fixed;inset:0;z-index:9999;background:linear-gradient(160deg,#020617 0%,#0A1628 40%,#0E2040 70%,#020617 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
.wl-particle{position:absolute;border-radius:50%;pointer-events:none}
.wl-ray{position:absolute;bottom:50%;left:50%;width:2px;transform-origin:bottom center;pointer-events:none}
.wl-card{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 24px;max-width:640px;width:100%}
.wl-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(251,191,36,.12);border:1.5px solid rgba(251,191,36,.35);border-radius:100px;padding:7px 20px;font-size:12.5px;font-weight:800;color:#FBBF24;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px;animation:chipIn .7s ease .2s both}
.wl-title{font-size:clamp(42px,8vw,72px);font-weight:900;line-height:1.1;margin-bottom:14px;background:linear-gradient(135deg,#fff 0%,#FBBF24 45%,#F59E0B 65%,#fff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:chipIn .7s ease .35s both;filter:drop-shadow(0 0 40px rgba(251,191,36,.3))}
.wl-sub{font-size:17px;color:rgba(255,255,255,.55);margin-bottom:10px;line-height:1.6;animation:chipIn .7s ease .5s both}
.wl-school{font-size:14px;color:rgba(251,191,36,.7);font-weight:700;margin-bottom:32px;animation:chipIn .7s ease .6s both}
.wl-features{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;margin-bottom:38px;animation:chipIn .7s ease .7s both}
.wl-feat{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:7px 16px;font-size:13px;font-weight:600;color:rgba(255,255,255,.75)}
.wl-btn{background:linear-gradient(135deg,#FBBF24,#D97706);color:#fff;border:none;border-radius:16px;padding:18px 56px;font-size:18px;font-weight:900;cursor:pointer;font-family:inherit;letter-spacing:.4px;box-shadow:0 12px 40px rgba(217,119,6,.5);animation:chipIn .7s ease .85s both;transition:all .18s}
.wl-btn:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 18px 48px rgba(217,119,6,.6)}
.wl-hint{font-size:12px;color:rgba(255,255,255,.22);margin-top:16px;animation:chipIn .7s ease 1s both}
@keyframes wlFloat{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-18px) rotate(4deg)}66%{transform:translateY(-8px) rotate(-3deg)}}

/* ═══ ROUND TRANSITION ═══ */
.round-screen{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:100;animation:roundIn .4s ease both}
@keyframes roundIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
.round-badge{display:inline-flex;align-items:center;gap:10px;padding:10px 24px;border-radius:100px;font-size:13px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:18px}
.round-name{font-size:52px;font-weight:900;color:#fff;text-align:center;line-height:1.15;margin-bottom:12px;text-shadow:0 4px 32px rgba(0,0,0,.4)}
.round-desc{font-size:15px;color:rgba(255,255,255,.6);text-align:center;margin-bottom:32px;max-width:480px;line-height:1.6}
.round-progress{display:flex;gap:10px;align-items:center;margin-bottom:32px}
.round-dot{width:36px;height:8px;border-radius:100px;transition:all .3s}
.round-info-grid{display:flex;gap:16px;margin-bottom:36px}
.round-info-box{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:14px;padding:14px 20px;text-align:center;min-width:100px}
.round-info-v{font-size:26px;font-weight:900;color:#fff;line-height:1}
.round-info-l{font-size:11px;color:rgba(255,255,255,.5);font-weight:700;margin-top:4px;letter-spacing:1px;text-transform:uppercase}

/* round indicator in game */
.round-pill{display:flex;align-items:center;gap:6px;padding:4px 12px;border-radius:100px;font-size:12px;font-weight:700;border:1px solid;cursor:default}

/* ═══ WINNER SCREEN ═══ */
.winner-screen{position:fixed;inset:0;z-index:100;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(160deg,#0A1628 0%,#0E2040 50%,#0A1628 100%)}
.winner-particles{position:absolute;inset:0;pointer-events:none}
.confetti{position:absolute;top:-20px;border-radius:3px;animation:confettiFall linear infinite}
@keyframes confettiFall{0%{transform:translateY(-30px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
.firework{position:absolute;border-radius:50%;animation:fireworkBurst .7s ease-out forwards}
@keyframes fireworkBurst{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:0}}
.fw-spark{position:absolute;width:4px;height:4px;border-radius:50%;animation:sparkFly .8s ease-out forwards}
@keyframes sparkFly{0%{transform:translate(0,0);opacity:1}100%{opacity:0}}

/* crown bounce */
.crown-anim{animation:crownDrop .6s cubic-bezier(.175,.885,.32,1.275) both}
@keyframes crownDrop{0%{transform:translateY(-80px) scale(.3) rotate(-20deg);opacity:0}60%{transform:translateY(10px) scale(1.1) rotate(5deg)}100%{transform:translateY(0) scale(1) rotate(0);opacity:1}}

/* winner name glow */
.winner-name-glow{animation:nameGlow 2s ease-in-out infinite alternate}
@keyframes nameGlow{from{text-shadow:0 0 20px rgba(251,191,36,.4),0 0 40px rgba(251,191,36,.2)}to{text-shadow:0 0 40px rgba(251,191,36,.8),0 0 80px rgba(251,191,36,.4),0 0 120px rgba(251,191,36,.2)}}

/* gold ring pulse */
.gold-ring{position:absolute;border-radius:50%;border:2px solid rgba(251,191,36,.3);animation:goldRingPulse 2s ease-in-out infinite}
@keyframes goldRingPulse{0%{transform:scale(.8);opacity:0}50%{opacity:.7}100%{transform:scale(2.5);opacity:0}}

/* stat cards */
.win-stat{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:16px 20px;text-align:center;flex:1}
.win-stat-v{font-size:28px;font-weight:900;color:#FBBF24;line-height:1;margin-bottom:4px}
.win-stat-l{font-size:11px;color:rgba(255,255,255,.4);font-weight:600;letter-spacing:.5px;text-transform:uppercase}

/* log scroll */
.win-log{background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px 15px;max-height:140px;overflow-y:auto;text-align:left}

/* bell swing */
.bell-swing{animation:bellSwing 1s ease-in-out infinite}
@keyframes bellSwing{0%,100%{transform:rotate(-18deg)}50%{transform:rotate(18deg)}}
.bell-wrap{transform-origin:top center}


.splash{position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(160deg,#0A1628 0%,#0E2040 40%,#162D52 70%,#0A1628 100%)}

/* particles */
.splash-particles{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.sp-particle{position:absolute;border-radius:50%;animation:spFloat linear infinite}
@keyframes spFloat{0%{transform:translateY(110vh) scale(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-20vh) scale(1.2);opacity:0}}

/* glow rings */
.splash-ring{position:absolute;border-radius:50%;border:1.5px solid rgba(251,191,36,.15);animation:ringPulse 3s ease-in-out infinite}
@keyframes ringPulse{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(1.08);opacity:.7}}

/* gold beam */
.splash-beam{position:absolute;top:0;left:50%;transform:translateX(-50%);width:3px;height:40%;background:linear-gradient(180deg,rgba(251,191,36,.8),transparent);filter:blur(2px);animation:beamPulse 2s ease-in-out infinite alternate}
@keyframes beamPulse{from{opacity:.4;height:35%}to{opacity:.9;height:45%}}

/* trophy bounce */
.splash-trophy{animation:trophyBounce 1.8s ease-in-out infinite}
@keyframes trophyBounce{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-18px) scale(1.05)}60%{transform:translateY(-12px) scale(1.03)}}

/* title glow */
.splash-title{background:linear-gradient(135deg,#fff 0%,#FBBF24 40%,#F59E0B 70%,#fff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 30px rgba(251,191,36,.5));animation:titleShimmer 3s linear infinite}
@keyframes titleShimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}

/* star twinkle */
.splash-star{position:absolute;border-radius:50%;background:#FBBF24;animation:twinkle ease-in-out infinite}
@keyframes twinkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}

/* info chips */
.sp-chip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:100px;padding:7px 18px;font-size:14px;font-weight:700;color:rgba(255,255,255,.85);backdrop-filter:blur(8px);animation:chipIn .5s ease both}
@keyframes chipIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

/* countdown ring */
.cd-ring{position:relative;width:100px;height:100px}
.cd-svg{transform:rotate(-90deg);width:100%;height:100%}
.cd-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:900;color:#FBBF24;text-shadow:0 0 20px rgba(251,191,36,.6)}

/* progress bar */
.splash-pb{width:320px;height:5px;background:rgba(255,255,255,.12);border-radius:100px;overflow:hidden}
.splash-pf{height:100%;background:linear-gradient(90deg,#FBBF24,#F59E0B,#FBBF24);border-radius:100px;background-size:200% 100%;animation:pbShimmer 1.5s linear infinite}
@keyframes pbShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* vol knob */
.vol-knob{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:100px;padding:6px 14px;cursor:pointer;transition:all .14s}
.vol-knob:hover{background:rgba(255,255,255,.14)}
.vol-slider{-webkit-appearance:none;width:80px;height:4px;border-radius:100px;background:rgba(255,255,255,.25);outline:none;cursor:pointer}
.vol-slider::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#FBBF24,#D97706);cursor:pointer}

/* CSS ────────────────── */
.shell{display:flex;height:100vh;overflow:hidden}
.sb{width:250px;flex-shrink:0;background:#fff;border-right:1px solid #E9EEF5;display:flex;flex-direction:column}
.mw{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0}
.tb{height:56px;background:#fff;border-bottom:1px solid #E9EEF5;display:flex;align-items:center;justify-content:space-between;padding:0 26px;flex-shrink:0}
.pb{flex:1;overflow-y:auto;padding:26px}

.sb-logo{padding:16px 14px;border-bottom:1px solid #F0F4F8;display:flex;align-items:center;gap:10px}
.sb-ico{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#FBBF24,#D97706);display:flex;align-items:center;justify-content:center;font-size:17px;box-shadow:0 4px 10px rgba(217,119,6,.28);flex-shrink:0}
.nav-item{display:flex;align-items:center;gap:9px;padding:8px 11px;border-radius:9px;cursor:pointer;color:#64748B;font-size:13.5px;font-weight:500;transition:all .17s;margin-bottom:2px}
.nav-item:hover{background:#FFFBEB;color:#C47A0A}
.nav-item.on{background:linear-gradient(135deg,#FBBF24,#D97706);color:#fff;box-shadow:0 4px 12px rgba(217,119,6,.28);font-weight:700}
.nb{margin-left:auto;background:rgba(255,255,255,.25);color:#fff;border-radius:100px;padding:1px 7px;font-size:11px;font-weight:700}
.nb-off{margin-left:auto;background:#FEF3C7;color:#D97706;border-radius:100px;padding:1px 7px;font-size:11px;font-weight:700}
.sb-ft{padding:12px;border-top:1px solid #F0F4F8}
.sb-teacher{background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:10px 12px}

.tb-title{font-size:15px;font-weight:700;color:#1E3A5F;display:flex;align-items:center;gap:8px}
.tb-date{font-size:12px;color:#94A3B8;font-weight:500;background:#F1F5F9;padding:5px 12px;border-radius:7px}

.btn{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:9px;font-size:13.5px;font-weight:600;cursor:pointer;border:none;transition:all .17s;font-family:inherit;white-space:nowrap;line-height:1}
.btn:active{transform:scale(.98)}
.btn-p{background:linear-gradient(135deg,#FBBF24,#D97706);color:#fff;box-shadow:0 2px 8px rgba(217,119,6,.22)}
.btn-p:hover{box-shadow:0 5px 18px rgba(217,119,6,.38);transform:translateY(-1px)}
.btn-d{background:linear-gradient(135deg,#1E3A5F,#152C47);color:#fff;box-shadow:0 2px 8px rgba(30,58,95,.18)}
.btn-d:hover{box-shadow:0 5px 18px rgba(30,58,95,.32);transform:translateY(-1px)}
.btn-g{background:#fff;color:#475569;border:1.5px solid #E2E8F0}
.btn-g:hover{border-color:#FBBF24;color:#D97706}
.btn-r{background:linear-gradient(135deg,#F87171,#EF4444);color:#fff;box-shadow:0 2px 8px rgba(239,68,68,.18)}
.btn-r:hover{box-shadow:0 5px 18px rgba(239,68,68,.38);transform:translateY(-1px)}
.btn-green{background:linear-gradient(135deg,#4ADE80,#22C55E);color:#14532D;box-shadow:0 2px 8px rgba(34,197,94,.22)}
.btn-green:hover{box-shadow:0 5px 18px rgba(34,197,94,.38);transform:translateY(-1px)}
.btn-sm{padding:6px 12px;font-size:12.5px;border-radius:7px;gap:5px}
.btn-lg{padding:12px 24px;font-size:15px;border-radius:11px}
.btn-ic{width:34px;height:34px;padding:0;justify-content:center;border-radius:8px}
.btn:disabled{opacity:.42;cursor:not-allowed;transform:none!important;box-shadow:none!important}

.card{background:#fff;border-radius:14px;border:1px solid #E9EEF5;box-shadow:0 1px 6px rgba(0,0,0,.05)}
.card-h{transition:transform .17s,box-shadow .17s}
.card-h:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.09)}

.sc{background:#fff;border-radius:14px;padding:20px;border:1px solid #E9EEF5;box-shadow:0 1px 6px rgba(0,0,0,.05);transition:transform .17s,box-shadow .17s}
.sc:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,.09)}
.sc-ico{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:14px}
.sc-val{font-size:30px;font-weight:900;line-height:1;margin-bottom:3px}
.sc-lbl{font-size:12px;color:#94A3B8;font-weight:600}

.badge{display:inline-flex;align-items:center;gap:3px;padding:2px 9px;border-radius:100px;font-size:11.5px;font-weight:700}
.bg{background:#F1F5F9;color:#64748B}
.bb{background:#DBEAFE;color:#1D4ED8}
.bgo{background:#FEF3C7;color:#B45309}
.bgr{background:#D1FAE5;color:#065F46}
.bred{background:#FEE2E2;color:#991B1B}
.bpu{background:#EDE9FE;color:#5B21B6}
.btl{background:#CCFBF1;color:#0F766E}
.borange{background:#FEF3C7;color:#D97706}

.label{display:block;font-size:12px;font-weight:700;color:#374151;margin-bottom:5px;letter-spacing:.2px}
.req{color:#EF4444;margin-left:2px}
.inp{width:100%;padding:9px 13px;border:1.5px solid #E2E8F0;border-radius:9px;font-size:13.5px;outline:none;transition:border .17s,box-shadow .17s;font-family:inherit;color:#1E293B;background:#fff}
.inp:focus{border-color:#FBBF24;box-shadow:0 0 0 3px rgba(251,191,36,.16)}
.inp::placeholder{color:#CBD5E1}
.ig{position:relative}
.ii{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:#94A3B8;pointer-events:none}
.ip{padding-left:34px}
.hint{font-size:11.5px;color:#94A3B8;margin-top:4px}

.divider{height:1px;background:#F0F4F8;margin:18px 0}
.sec-title{font-size:11.5px;font-weight:800;color:#94A3B8;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:14px}
.page-in{animation:pIn .24s ease}
@keyframes pIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}

.tbl{width:100%;border-collapse:collapse}
.tbl th{font-size:11px;font-weight:700;color:#94A3B8;letter-spacing:.8px;text-transform:uppercase;padding:10px 14px;background:#F8FAFC;text-align:left;border-bottom:1px solid #E9EEF5}
.tbl th:first-child{border-radius:10px 0 0 10px}
.tbl th:last-child{border-radius:0 10px 10px 0}
.tbl td{padding:11px 14px;font-size:13.5px;border-bottom:1px solid #F0F4F8;vertical-align:middle}
.tbl tr:last-child td{border-bottom:none}
.tbl tr:hover td{background:#FFFBEB}

.ov{position:fixed;inset:0;background:rgba(15,23,42,.55);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:999;padding:20px}
.modal{background:#fff;border-radius:18px;width:100%;max-width:640px;max-height:92vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,.24)}
.mhd{padding:22px 26px 0;display:flex;align-items:center;justify-content:space-between}
.mbd{padding:18px 26px 26px}

.pt{background:#F1F5F9;border-radius:100px;height:7px;overflow:hidden}
.pf{height:100%;border-radius:100px;background:linear-gradient(90deg,#FBBF24,#D97706);transition:width .4s}

.empty{padding:52px 24px;text-align:center;color:#94A3B8}
.empty-ico{font-size:42px;margin-bottom:12px}
.empty-txt{font-size:14px;line-height:1.6}

.ir{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.ii2{display:flex;align-items:center;gap:5px;font-size:12.5px;color:#94A3B8;font-weight:500}

.cc{border:1.5px solid #E9EEF5;border-radius:14px;padding:20px 22px;background:#fff;transition:border-color .17s,box-shadow .17s}
.cc:hover{border-color:#FBBF24;box-shadow:0 4px 16px rgba(217,119,6,.12)}

.step-bar{display:flex;align-items:center;margin-bottom:22px}
.step-i{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;color:#CBD5E1}
.step-i.done{color:#D97706}
.step-i.active{color:#1E293B}
.step-dot{width:26px;height:26px;border-radius:50%;border:2px solid #E2E8F0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0}
.step-i.done .step-dot{border-color:#D97706;background:#D97706;color:#fff}
.step-i.active .step-dot{border-color:#1E293B;background:#1E293B;color:#fff}
.step-ln{flex:1;height:1.5px;background:#E2E8F0;min-width:16px}

.rc{padding:6px 13px;border-radius:8px;font-size:13px;font-weight:600;border:1.5px solid #E2E8F0;cursor:pointer;transition:all .15s;color:#64748B;background:#fff}
.rc.on{border-color:#D97706;background:#FFFBEB;color:#D97706}

.sp{background:linear-gradient(160deg,#1E3A5F,#112438);border-radius:14px;padding:18px 20px}
.spr{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.07)}
.spr:last-child{border-bottom:none}
.spk{font-size:12px;color:rgba(255,255,255,.45);font-weight:500}
.spv{font-size:13px;color:#fff;font-weight:700}

.hb{background:#F0F9FF;border:1px solid #BAE6FD;border-radius:9px;padding:10px 14px;display:flex;gap:8px;font-size:12.5px;color:#0369A1;line-height:1.5}

.qp{border:1.5px solid #E2E8F0;border-radius:10px;padding:12px 14px;cursor:pointer;transition:all .17s;display:flex;gap:10px;align-items:flex-start}
.qp:hover{border-color:#FBBF24;background:#FFFBEB}
.qp.picked{border-color:#FBBF24;background:#FFFBEB}
.qpb{width:20px;height:20px;border-radius:5px;border:1.5px solid #CBD5E1;background:#fff;flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;transition:all .15s}
.qp.picked .qpb{background:#D97706;border-color:#D97706;color:#fff}

/* ═══ GAME SCREEN ═══ */
.gs{background:linear-gradient(160deg,#0B1628,#162D4A 55%,#0B1628);min-height:100vh;display:flex;flex-direction:column}
.ginner{display:flex;flex:1;overflow:hidden}

/* Game top bar */
.gtb{background:rgba(0,0,0,.3);border-bottom:1px solid rgba(255,255,255,.08);padding:12px 22px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.gtb-name{font-size:14px;font-weight:800;color:#fff}
.gtb-meta{display:flex;gap:10px;align-items:center}
.gmeta-tag{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.12);border-radius:7px;padding:4px 11px;font-size:12px;font-weight:600;color:rgba(255,255,255,.65)}

/* Game main */
.gm{flex:1;display:flex;flex-direction:column;padding:18px 22px;gap:14px;min-width:0;overflow-y:auto}

/* Counters */
.gcnts{display:flex;gap:11px;align-items:center}
.gcnt{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:10px 18px;text-align:center;min-width:80px;flex-shrink:0}
.gcnt-v{font-size:24px;font-weight:900;color:#fff;line-height:1}
.gcnt-l{font-size:9px;font-weight:700;color:rgba(255,255,255,.38);letter-spacing:1.2px;text-transform:uppercase;margin-top:3px}

/* Question card */
.gqc{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:22px 24px;flex:1}
.gqn{font-size:10px;font-weight:700;color:rgba(255,255,255,.32);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.gqt{font-size:19px;font-weight:700;color:#fff;line-height:1.58;margin-bottom:20px}
.gans{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.ga{background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.12);border-radius:11px;padding:14px 16px;display:flex;align-items:center;gap:10px;transition:all .22s}
.ga.rc2{background:rgba(34,197,94,.2);border-color:#22C55E}
.ga.rw{background:rgba(239,68,68,.1);border-color:rgba(239,68,68,.35);opacity:.65}
.gak{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;background:rgba(255,255,255,.1);color:rgba(255,255,255,.55)}
.rc2 .gak{background:rgba(34,197,94,.35);color:#86EFAC}
.rw .gak{background:rgba(239,68,68,.25);color:#FCA5A5}
.gat{font-size:14px;color:rgba(255,255,255,.82);font-weight:500;line-height:1.42}
.rc2 .gat{color:#86EFAC;font-weight:700}

/* Control zone */
.gctrl{display:flex;gap:9px;flex-wrap:wrap;align-items:center}
.gcb{flex:1;justify-content:center;padding:13px;font-size:14px;min-width:140px;border-radius:11px}

/* Timer zone */
.gtimer-zone{display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px 0}
.tw{position:relative;width:100px;height:100px;flex-shrink:0}
.tn{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.tctrl{display:flex;gap:6px;width:100%}
.tbtn{flex:1;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.65);padding:6px 8px;border-radius:8px;cursor:pointer;font-size:11.5px;font-weight:600;font-family:inherit;transition:all .14s;display:flex;align-items:center;justify-content:center;gap:5px}
.tbtn:hover{background:rgba(255,255,255,.17)}
.tbtn.run{background:rgba(251,191,36,.15);border-color:rgba(251,191,36,.35);color:#FBBF24}
.tbtn:disabled{opacity:.35;cursor:not-allowed}

/* time-expired alert */
.texp{background:rgba(239,68,68,.18);border:1px solid rgba(239,68,68,.4);border-radius:9px;padding:8px 12px;font-size:12.5px;color:#FCA5A5;font-weight:700;text-align:center;width:100%}

/* Student sidebar */
.gsd{width:300px;flex-shrink:0;background:rgba(0,0,0,.25);border-left:1px solid rgba(255,255,255,.07);display:flex;flex-direction:column;padding:16px 13px;gap:13px;overflow:hidden}
.gsd-title{font-size:9.5px;font-weight:800;color:rgba(255,255,255,.32);letter-spacing:2px;text-transform:uppercase}
.gsd-scroll{flex:1;overflow-y:auto;display:grid;grid-template-columns:repeat(2,1fr);gap:3px;padding-right:2px;align-content:start}

/* Player chips */
.pc{display:flex;align-items:center;gap:5px;padding:4px 8px;border-radius:7px;font-size:11.5px;font-weight:600;border:1.5px solid transparent;cursor:pointer;transition:all .14s;user-select:none}
.pc.ok{background:rgba(34,197,94,.1);border-color:rgba(34,197,94,.28);color:#86EFAC}
.pc.ok:hover{background:rgba(34,197,94,.18);border-color:rgba(34,197,94,.5)}
.pc.se{background:rgba(239,68,68,.22);border-color:#EF4444;color:#FCA5A5;transform:scale(.98)}
.pc.out{background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.06);color:rgba(255,255,255,.22);text-decoration:line-through;cursor:default}

/* Simulation button */
.sim-btn{background:rgba(139,92,246,.14);border:1px solid rgba(139,92,246,.28);color:#C4B5FD;padding:8px 12px;border-radius:9px;cursor:pointer;font-size:12.5px;font-weight:600;font-family:inherit;width:100%;transition:all .14s;display:flex;align-items:center;justify-content:center;gap:6px}
.sim-btn:hover{background:rgba(139,92,246,.24)}
.sim-btn:disabled{opacity:.35;cursor:not-allowed}

/* Confirmed badge */
.conf-ok{background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.28);border-radius:9px;padding:9px 12px;font-size:12.5px;color:#4ADE80;font-weight:600;text-align:center;width:100%}

/* Game log */
.glog{border-top:1px solid rgba(255,255,255,.07);padding-top:11px;flex-shrink:0}
.glog-title{font-size:9px;font-weight:800;color:rgba(255,255,255,.25);letter-spacing:2px;text-transform:uppercase;margin-bottom:7px}
.glog-scroll{max-height:100px;overflow-y:auto;display:flex;flex-direction:column;gap:3px}
.glog-item{font-size:11.5px;color:rgba(255,255,255,.35);padding:3px 0;border-bottom:1px solid rgba(255,255,255,.05)}

/* progress in game */
.gpt{background:rgba(255,255,255,.08);border-radius:100px;height:5px;overflow:hidden}
.gpf{height:100%;border-radius:100px;background:linear-gradient(90deg,#FBBF24,#D97706);transition:width .5s}

/* setup */
.scard{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:26px 30px;width:100%;max-width:520px}
.sta{width:100%;background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.14);border-radius:10px;color:#fff;font-family:inherit;font-size:13.5px;padding:10px 13px;resize:vertical;outline:none;transition:border .17s}
.sta:focus{border-color:#FBBF24}
.sta::placeholder{color:rgba(255,255,255,.24)}

/* result */
.rcard{background:rgba(255,255,255,.06);border:1px solid rgba(245,158,11,.28);border-radius:22px;padding:38px 34px;text-align:center;width:100%;max-width:520px}
.rsg{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;margin:22px 0}
.rs{background:rgba(255,255,255,.07);border-radius:12px;padding:15px 8px}
.rs-v{font-size:26px;font-weight:900;color:#fff;line-height:1}
.rs-l{font-size:10px;font-weight:700;color:rgba(255,255,255,.38);letter-spacing:.8px;text-transform:uppercase;margin-top:4px}
.wp{animation:wp 1.2s ease-in-out infinite alternate}
@keyframes wp{from{transform:scale(1);filter:drop-shadow(0 0 8px rgba(251,191,36,.3))}to{transform:scale(1.07);filter:drop-shadow(0 0 24px rgba(251,191,36,.7))}}

/* mode toggle */
.mode-toggle{display:flex;background:#F1F5F9;border-radius:11px;padding:4px;gap:3px}
.mode-btn{flex:1;padding:9px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:transparent;color:#64748B;font-family:inherit;transition:all .17s;display:flex;align-items:center;justify-content:center;gap:6px}
.mode-btn.on{background:#fff;color:#1E293B;box-shadow:0 2px 8px rgba(0,0,0,.1);font-weight:800}

/* team class builder */
.class-builder{background:#F8FAFC;border:1.5px solid #E2E8F0;border-radius:12px;padding:16px 18px}
.class-grade-label{font-size:13px;font-weight:800;color:#1D4ED8;background:#DBEAFE;border-radius:8px;padding:4px 10px;text-align:center;flex-shrink:0;white-space:nowrap}
.class-count-chip{padding:4px 10px;border-radius:7px;font-size:12px;font-weight:600;border:1.5px solid #E2E8F0;cursor:pointer;transition:all .12s;color:#64748B;background:#fff;white-space:nowrap}
.class-count-chip:hover{border-color:#FBBF24;color:#D97706;background:#FFFBEB}

/* team chips in game (larger) */
.tc{display:flex;align-items:center;gap:6px;padding:7px 10px;border-radius:9px;font-size:12.5px;font-weight:800;border:1.5px solid transparent;cursor:pointer;transition:all .14s;user-select:none}
.tc.ok{background:rgba(34,197,94,.12);border-color:rgba(34,197,94,.35);color:#86EFAC}
.tc.ok:hover{background:rgba(34,197,94,.22);border-color:rgba(34,197,94,.6)}
.tc.se{background:rgba(239,68,68,.25);border-color:#EF4444;color:#FCA5A5;transform:scale(.98)}
.tc.out{background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.06);color:rgba(255,255,255,.22);text-decoration:line-through;cursor:default}
.tc-ico{font-size:14px;flex-shrink:0}
.tc-label{flex:1}
.tc-badge{background:rgba(255,255,255,.12);border-radius:5px;padding:1px 7px;font-size:10.5px;flex-shrink:0}
.tc.out .tc-badge{opacity:.35}

/* team setup grid */
.team-setup-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:7px;max-height:220px;overflow-y:auto;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:12px}
.tsg-chip{padding:8px 10px;border-radius:8px;font-size:13px;font-weight:700;text-align:center;cursor:pointer;transition:all .14s;border:1.5px solid rgba(255,255,255,.14);color:rgba(255,255,255,.65);background:rgba(255,255,255,.06);user-select:none}
.tsg-chip.on{background:rgba(34,197,94,.18);border-color:rgba(34,197,94,.45);color:#86EFAC}
.tsg-chip:hover:not(.on){background:rgba(255,255,255,.12)}

/* multi-subject selector */
.subj-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:4px}
.subj-chip{border:2px solid #E2E8F0;border-radius:11px;padding:10px 12px;cursor:pointer;transition:all .17s;display:flex;align-items:center;gap:8px;background:#fff;user-select:none}
.subj-chip:hover{border-color:#FBBF24;background:#FFFBEB}
.subj-chip.on{border-width:2px}
.subj-chip-ico{font-size:18px;flex-shrink:0}
.subj-chip-lbl{font-size:12.5px;font-weight:700;line-height:1.3;flex:1}
.subj-chip-chk{width:18px;height:18px;border-radius:5px;border:2px solid #CBD5E1;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;transition:all .15s}
.subj-chip.on .subj-chip-chk{color:#fff}
.grade-chip{padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;border:1.5px solid #E2E8F0;cursor:pointer;transition:all .15s;color:#64748B;background:#fff}
.grade-chip.on{border-color:#1D4ED8;background:#DBEAFE;color:#1D4ED8}

/* history detail modal */
.hist-detail{background:#fff;border-radius:18px;width:100%;max-width:700px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,.24)}
/* theme picker */
.theme-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.theme-card{border:2px solid #E2E8F0;border-radius:13px;padding:14px 12px;cursor:pointer;transition:all .18s;display:flex;flex-direction:column;align-items:center;gap:8px;background:#fff;user-select:none}
.theme-card:hover{border-color:#FBBF24;transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.1)}
.theme-card.on{border-width:2.5px;box-shadow:0 6px 18px rgba(0,0,0,.12)}
.theme-swatch{width:48px;height:48px;border-radius:12px;display:flex;gap:3px;overflow:hidden;align-items:center;justify-content:center}
.theme-name{font-size:12.5px;font-weight:700;text-align:center;color:#1E293B}

/* font size slider */
.fs-slider{width:100%;-webkit-appearance:none;height:6px;border-radius:100px;background:#E2E8F0;outline:none}
.fs-slider::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#FBBF24,#D97706);cursor:pointer;box-shadow:0 2px 6px rgba(217,119,6,.3)}

/* question bank view toggle */
.qb-viewtab{display:flex;background:#F1F5F9;border-radius:10px;padding:3px;gap:2px;flex-shrink:0}
.qb-vtab{padding:7px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:transparent;color:#64748B;font-family:inherit;transition:all .15s;white-space:nowrap}
.qb-vtab.on{background:#fff;color:#1E293B;box-shadow:0 1px 6px rgba(0,0,0,.08);font-weight:800}

/* contest group card */
.cg-card{border:1.5px solid #E9EEF5;border-radius:14px;overflow:hidden;background:#fff;margin-bottom:14px;transition:border-color .17s}
.cg-card:hover{border-color:#FBBF24}
.cg-header{padding:14px 18px;display:flex;align-items:center;gap:12px;cursor:pointer;user-select:none;background:#FAFBFC}
.cg-header:hover{background:#FFFBEB}
.cg-chevron{font-size:11px;color:#94A3B8;transition:transform .2s;flex-shrink:0}
.cg-chevron.open{transform:rotate(90deg)}
.cg-body{border-top:1px solid #F0F4F8;padding:0}
.cg-q-row{padding:12px 18px;display:flex;gap:12px;align-items:flex-start;border-bottom:1px solid #F8FAFC}
.cg-q-row:last-child{border-bottom:none}
.cg-q-row:hover{background:#FFFBEB}
.cg-q-num{width:24px;height:24px;border-radius:6px;background:#F1F5F9;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#94A3B8;flex-shrink:0;margin-top:1px}

/* used-in badge */
.used-badge{background:#FEF3C7;color:#B45309;border-radius:6px;padding:2px 7px;font-size:11px;font-weight:700;white-space:nowrap}
.unused-badge{background:#F1F5F9;color:#94A3B8;border-radius:6px;padding:2px 7px;font-size:11px;font-weight:600;white-space:nowrap}

/* confirm dialog */
.confirm-ov{position:fixed;inset:0;background:rgba(15,23,42,.5);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px}
.confirm-box{background:#fff;border-radius:16px;padding:24px 26px;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.22)}
.confirm-title{font-size:16px;font-weight:800;color:#1E293B;margin-bottom:8px}
.confirm-msg{font-size:13.5px;color:#64748B;line-height:1.6;margin-bottom:20px}
.confirm-btns{display:flex;gap:9px;justify-content:flex-end}

/* ai generate */
.ai-modal{background:#fff;border-radius:18px;width:100%;max-width:720px;max-height:92vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,.24)}
.ai-q-card{border:1.5px solid #E2E8F0;border-radius:12px;padding:14px 16px;transition:border-color .15s}
.ai-q-card.selected{border-color:#22C55E;background:#F0FDF4}
.ai-q-card.rejected{border-color:#F87171;background:#FEF2F2;opacity:.6}
.ai-thinking{display:flex;align-items:center;gap:10px;padding:20px;background:#F8FAFC;border-radius:12px;font-size:13.5px;color:#64748B}
.ai-dot{width:8px;height:8px;border-radius:50%;background:#FBBF24;animation:aiPulse 1.2s ease-in-out infinite}
.ai-dot:nth-child(2){animation-delay:.2s}
.ai-dot:nth-child(3){animation-delay:.4s}
@keyframes aiPulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}

/* excel import */
.xl-drop{border:2px dashed #CBD5E1;border-radius:14px;padding:32px 20px;text-align:center;transition:all .18s;cursor:pointer;background:#F8FAFC}
.xl-drop:hover,.xl-drop.over{border-color:#FBBF24;background:#FFFBEB}
.xl-col{background:#F1F5F9;border:1px solid #E2E8F0;border-radius:7px;padding:5px 10px;font-size:12px;font-weight:600;color:#475569;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.xl-fld{font-size:12px;font-weight:700;color:#1E293B}
.xl-row{display:flex;align-items:center;gap:8px;padding:7px 11px;border-radius:8px;font-size:13px;margin-bottom:4px}
.xl-row.ok{background:#D1FAE5;color:#065F46}
.xl-row.warn{background:#FEF3C7;color:#92400E}
.xl-row.err{background:#FEE2E2;color:#991B1B}
.preview-tbl{width:100%;border-collapse:collapse;font-size:12px}
.preview-tbl th{background:#F8FAFC;padding:6px 10px;text-align:left;font-weight:700;color:#64748B;font-size:11px;border-bottom:1px solid #E9EEF5;white-space:nowrap}
.preview-tbl td{padding:6px 10px;border-bottom:1px solid #F8FAFC;color:#374151;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.preview-tbl tr:hover td{background:#FFFBEB}

/* toggle switch */
.tgl{position:relative;width:36px;height:20px;flex-shrink:0}
.tgl input{opacity:0;width:0;height:0;position:absolute}
.tgl-track{position:absolute;inset:0;border-radius:100px;background:#CBD5E1;cursor:pointer;transition:background .18s}
.tgl input:checked+.tgl-track{background:#22C55E}
.tgl-thumb{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .18s;pointer-events:none;box-shadow:0 1px 3px rgba(0,0,0,.25)}
.tgl input:checked~.tgl-thumb{transform:translateX(16px)}

/* sound btn in game */
.snd-btn{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.65);padding:6px 11px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;font-family:inherit;transition:all .14s;display:flex;align-items:center;gap:5px}
.snd-btn:hover{background:rgba(255,255,255,.17)}
.snd-btn.muted{opacity:.45}

.stab-bar{display:flex;gap:4px;background:#F1F5F9;border-radius:12px;padding:4px;margin-bottom:22px}
.stab{flex:1;padding:9px 12px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:transparent;color:#64748B;font-family:inherit;transition:all .17s;display:flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap}
.stab.on{background:#fff;color:#1E293B;box-shadow:0 2px 8px rgba(0,0,0,.09);font-weight:800}

/* logo emoji picker */
.emoji-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:5px;background:#F8FAFC;border:1.5px solid #E2E8F0;border-radius:10px;padding:10px}
.emoji-opt{width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:19px;border-radius:7px;cursor:pointer;transition:all .14s;border:1.5px solid transparent}
.emoji-opt:hover{background:#FFFBEB;border-color:#FBBF24}
.emoji-opt.on{background:#FEF3C7;border-color:#D97706;box-shadow:0 2px 6px rgba(217,119,6,.2)}

/* preview card */
.school-preview{background:linear-gradient(135deg,#1E3A5F,#112438);border-radius:14px;padding:20px 22px;color:#fff}
.sp-logo{width:52px;height:52px;border-radius:13px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:12px;border:1.5px solid rgba(255,255,255,.15)}
.sp-school{font-size:16px;font-weight:900;line-height:1.3;margin-bottom:3px}
.sp-addr{font-size:11.5px;color:rgba(255,255,255,.5);line-height:1.5;margin-bottom:12px}
.sp-teacher-row{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.08);border-radius:10px;padding:10px 13px}
.sp-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#FBBF24,#D97706);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.sp-tname{font-size:13.5px;font-weight:800;color:#FBBF24;line-height:1.3}
.sp-trole{font-size:11.5px;color:rgba(255,255,255,.45)}

/* save toast */
.save-toast{position:fixed;bottom:24px;right:24px;background:#22C55E;color:#fff;border-radius:10px;padding:11px 18px;font-size:13.5px;font-weight:700;box-shadow:0 8px 24px rgba(34,197,94,.35);display:flex;align-items:center;gap:8px;z-index:9999;animation:toastIn .22s ease}
@keyframes toastIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
`;

// ─────────── SPLASH SCREEN ────────────
function SplashScreen({ contest, onReady, soundOn }) {
  const [countdown, setCountdown] = useState(5);
  const [vol, setVol] = useState(0.35);
  const [musicOn, setMusicOn] = useState(soundOn !== false);
  const [started, setStarted] = useState(false);
  const R = 44, C = 2*Math.PI*R;
  const subs = contest.subjects || [contest.subject];
  const m = SMETA[subs[0]] || {};

  // Stars & particles (static positions)
  const stars = useRef(Array.from({length:18},(_,i)=>({
    top: Math.random()*90, left: Math.random()*100,
    size: 2+Math.random()*3, delay: Math.random()*4, dur: 2+Math.random()*3
  }))).current;
  const particles = useRef(Array.from({length:12},()=>({
    left: 5+Math.random()*90, size: 4+Math.random()*8,
    delay: Math.random()*6, dur: 5+Math.random()*5,
    color: Math.random()>.5 ? '#FBBF24' : '#60A5FA',
  }))).current;

  // Start music
  useEffect(() => {
    if (musicOn) { startBgMusic(vol); }
    return () => { BgMusic.stop(); };
  }, []);

  useEffect(() => { BgMusic.setVol(musicOn ? vol : 0); }, [vol, musicOn]);

  // Countdown
  useEffect(() => {
    if (!started) return;
    if (countdown <= 0) { BgMusic.stop(); onReady(); return; }
    if (soundOn !== false) Sounds.timeWarn();
    const t = setTimeout(() => setCountdown(c => c-1), 1000);
    return () => clearTimeout(t);
  }, [countdown, started]);

  const handleStart = () => { setStarted(true); if(soundOn!==false) Sounds.start(); };

  const pct = countdown/5;
  const dashOffset = C*(1-pct);

  return (
    <div className="splash">
      {/* Particles */}
      <div className="splash-particles">
        {particles.map((p,i) => (
          <div key={i} className="sp-particle" style={{ left:`${p.left}%`, width:p.size, height:p.size, background:p.color, animationDelay:`${p.delay}s`, animationDuration:`${p.dur}s` }}/>
        ))}
        {stars.map((s,i) => (
          <div key={`s${i}`} className="splash-star" style={{ top:`${s.top}%`, left:`${s.left}%`, width:s.size, height:s.size, animationDelay:`${s.delay}s`, animationDuration:`${s.dur}s` }}/>
        ))}
      </div>

      {/* Glow rings */}
      {[280,380,480].map((s,i) => (
        <div key={i} className="splash-ring" style={{ width:s, height:s, animationDelay:`${i*.7}s` }}/>
      ))}

      {/* Gold beam */}
      <div className="splash-beam"/>

      {/* Content */}
      <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", gap:0, textAlign:"center", padding:"0 24px", maxWidth:700, width:"100%" }}>

        {/* Bell icon */}
        <div className="splash-trophy" style={{ fontSize:72, lineHeight:1, marginBottom:16, filter:"drop-shadow(0 0 32px rgba(251,191,36,.6))" }}>
          🔔
        </div>

        {/* Title */}
        <div className="splash-title" style={{ fontSize:44, fontWeight:900, letterSpacing:-1, lineHeight:1.15, marginBottom:6 }}>
          RUNG CHUÔNG VÀNG
        </div>

        {/* Subtitle — contest name */}
        <div style={{ fontSize:18, fontWeight:700, color:"rgba(255,255,255,.7)", marginBottom:24, letterSpacing:.3 }}>
          {contest.name}
        </div>

        {/* Progress bar */}
        <div className="splash-pb" style={{ marginBottom:24 }}>
          <div className="splash-pf" style={{ width:"100%" }}/>
        </div>

        {/* Info chips */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", marginBottom:32 }}>
          {subs.map((s,i) => (
            <div key={s} className="sp-chip" style={{ animationDelay:`${i*.1}s` }}>
              {SMETA[s]?.emoji} {s}
            </div>
          ))}
          {(contest.grades||[contest.grade]).map(g => (
            <div key={g} className="sp-chip" style={{ animationDelay:".2s" }}>📚 Lớp {g}</div>
          ))}
          <div className="sp-chip" style={{ animationDelay:".3s" }}>
            {contest.mode==="team" ? "🏫 Thi theo lớp" : "👤 Thi cá nhân"}
          </div>
          <div className="sp-chip" style={{ animationDelay:".4s" }}>⏱ {contest.timePerQuestion}s/câu</div>
          <div className="sp-chip" style={{ animationDelay:".5s", background:"rgba(251,191,36,.18)", borderColor:"rgba(251,191,36,.4)", color:"#FBBF24" }}>
            📝 {contest.questionIds.length} câu hỏi
          </div>
        </div>

        {/* Action */}
        {!started ? (
          <button
            onClick={handleStart}
            style={{ background:"linear-gradient(135deg,#FBBF24,#D97706)", color:"#fff", border:"none", borderRadius:16, padding:"16px 52px", fontSize:18, fontWeight:900, cursor:"pointer", fontFamily:"inherit", letterSpacing:.5, boxShadow:"0 8px 32px rgba(217,119,6,.5)", transition:"all .17s", display:"flex", alignItems:"center", gap:10 }}
            onMouseEnter={e => e.target.style.transform="translateY(-3px) scale(1.03)"}
            onMouseLeave={e => e.target.style.transform="translateY(0) scale(1)"}>
            ▶ BẮT ĐẦU NGAY
          </button>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
            <div className="cd-ring">
              <svg className="cd-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="9"/>
                <circle cx="50" cy="50" r={R} fill="none" stroke={countdown>2?"#FBBF24":"#EF4444"} strokeWidth="9"
                  strokeDasharray={C} strokeDashoffset={dashOffset} strokeLinecap="round"
                  style={{transition:"stroke-dashoffset 1s linear,stroke .3s"}}/>
              </svg>
              <div className="cd-num">{countdown}</div>
            </div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,.5)", fontWeight:600, letterSpacing:2, textTransform:"uppercase" }}>
              Chuẩn bị...
            </div>
          </div>
        )}

        {/* Volume control */}
        <div style={{ marginTop:36, display:"flex", gap:12, alignItems:"center" }}>
          <div className="vol-knob" onClick={() => setMusicOn(m => !m)}>
            <span style={{ fontSize:14 }}>{musicOn ? "🎵" : "🔇"}</span>
            <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,.65)" }}>{musicOn?"Nhạc nền":"Tắt nhạc"}</span>
          </div>
          {musicOn && (
            <input type="range" className="vol-slider" min={0} max={1} step={.05}
              value={vol} onChange={e => setVol(+e.target.value)}/>
          )}
          <button onClick={() => { BgMusic.stop(); onReady(); }}
            style={{ background:"none", border:"none", color:"rgba(255,255,255,.28)", fontSize:12.5, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
            Bỏ qua →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────── TIMER ────────────
function Timer({ seconds, total, running, onEnd, soundOn }) {
  const [rem, setRem] = useState(seconds);
  const R = 38, C = 2 * Math.PI * R;
  const pct = rem / total;
  const offset = C * (1 - pct);
  const col = pct > 0.5 ? "#22C55E" : pct > 0.25 ? "#FBBF24" : "#EF4444";

  useEffect(() => { setRem(seconds); }, [seconds]);

  useEffect(() => {
    if (!running) return;
    if (rem <= 0) { onEnd(); return; }
    // Countdown beep for last 5 seconds — escalating pitch
    if (rem <= 5 && rem > 0 && soundOn !== false) {
      const freq = rem === 1 ? 1046 : rem === 2 ? 880 : rem === 3 ? 784 : rem === 4 ? 659 : 587;
      const vol  = rem <= 2 ? 0.32 : 0.22;
      tone(freq, rem === 1 ? 0.35 : 0.12, "sine", vol);
    }
    const t = setTimeout(() => setRem(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [rem, running]);

  return (
    <div className="tw">
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
        <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="9" />
        <circle cx="50" cy="50" r={R} fill="none" stroke={col} strokeWidth="9"
          strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear, stroke .4s" }} />
      </svg>
      <div className="tn">
        <span style={{ fontSize: 28, fontWeight: 900, color: col, lineHeight: 1, transition:"color .3s" }}>{rem}</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>giây</span>
      </div>
    </div>
  );
}

// ─────────── WINNER SCREEN ────────────
function WinnerScreen({ winner, isTeamMode, contestName, gradeLabel, subjLabel, today, players, questionsPlayed, elimCount, bonusRound, log, onFinish, soundOn }) {
  const [showLog, setShowLog] = useState(false);

  // Confetti pieces (static seed)
  const confetti = useRef(Array.from({length:60},(_,i)=>({
    left:  Math.random()*100,
    width: 6+Math.random()*10, height: 10+Math.random()*16,
    color: ['#FBBF24','#F59E0B','#60A5FA','#34D399','#F472B6','#A78BFA','#fff'][i%7],
    delay: Math.random()*4, dur: 3+Math.random()*4,
    rotate: Math.random()*360,
  }))).current;

  // Firework bursts (random positions)
  const fwPositions = useRef(Array.from({length:8},()=>({
    top:  10+Math.random()*60, left: 5+Math.random()*90,
    size: 40+Math.random()*80,
    color: ['#FBBF24','#60A5FA','#F472B6','#34D399','#A78BFA'][Math.floor(Math.random()*5)],
    delay: Math.random()*5, dur: .6+Math.random()*.4,
  }))).current;

  // Play win fanfare on mount
  useEffect(() => {
    if (soundOn === false) return;
    // Victory fanfare — ascending arpeggios
    const notes = [523,659,784,1047,784,1047,1319];
    notes.forEach((freq,i) => {
      setTimeout(() => tone(freq, i===notes.length-1?.6:.18, "triangle", i===notes.length-1?.4:.25), i*160);
    });
    // Bells
    setTimeout(() => { [1047,1319,1568].forEach((f,i)=>setTimeout(()=>tone(f,.4,"sine",.22),i*220)); }, 1400);
  }, []);

  return (
    <div className="winner-screen">
      {/* Confetti rain */}
      <div className="winner-particles">
        {confetti.map((c,i) => (
          <div key={i} className="confetti" style={{
            left:`${c.left}%`, width:c.width, height:c.height,
            background:c.color, borderRadius: i%3===0?'50%':3,
            animationDelay:`${c.delay}s`, animationDuration:`${c.dur}s`,
            transform:`rotate(${c.rotate}deg)`,
          }}/>
        ))}
        {/* Firework rings */}
        {fwPositions.map((f,i) => (
          <div key={i} style={{
            position:"absolute", top:`${f.top}%`, left:`${f.left}%`,
            width:f.size, height:f.size, borderRadius:"50%",
            border:`3px solid ${f.color}`,
            animation:`goldRingPulse ${f.dur+1.5}s ease-out ${f.delay}s infinite`,
          }}/>
        ))}
        {/* Floating stars */}
        {Array.from({length:20},(_,i)=>(
          <div key={`s${i}`} style={{
            position:"absolute",
            top:`${Math.random()*90}%`, left:`${Math.random()*100}%`,
            fontSize: 10+Math.random()*16, opacity:.6,
            animation:`twinkle ${2+Math.random()*3}s ease-in-out ${Math.random()*4}s infinite`,
          }}>⭐</div>
        ))}
      </div>

      {/* Gold rings behind winner */}
      {[160,240,320].map((s,i)=>(
        <div key={i} className="gold-ring" style={{ width:s,height:s, animationDelay:`${i*.4}s` }}/>
      ))}

      {/* Main content */}
      <div style={{ position:"relative", zIndex:2, width:"100%", maxWidth:680, padding:"0 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>

        {/* Rung chuông header */}
        <div style={{ fontSize:11, fontWeight:800, color:"rgba(251,191,36,.55)", letterSpacing:4, textTransform:"uppercase", marginBottom:16 }}>
          🔔 Rung Chuông Vàng
        </div>

        {winner ? (
          <>
            {/* Crown */}
            <div className="crown-anim" style={{ fontSize:72, lineHeight:1, marginBottom:10, filter:"drop-shadow(0 0 30px rgba(251,191,36,.8))" }}>
              👑
            </div>

            {/* Champion label */}
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:5, textTransform:"uppercase", color:"rgba(251,191,36,.6)", marginBottom:10 }}>
              {isTeamMode ? "🏆 Lớp Vô Địch" : "🏆 Người Chiến Thắng"}
            </div>

            {/* Winner name */}
            <div className="winner-name-glow splash-title" style={{
              fontSize: winner.length > 20 ? 34 : winner.length > 12 ? 42 : 52,
              fontWeight: 900, marginBottom: 8, lineHeight: 1.2, textAlign:"center",
              background:"linear-gradient(135deg,#fff 0%,#FBBF24 40%,#F59E0B 60%,#fff 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>
              {winner}
            </div>

            {/* Subtitle */}
            <div style={{ fontSize:14, color:"rgba(255,255,255,.45)", marginBottom:6, textAlign:"center" }}>
              {isTeamMode ? "đã vượt qua mọi thử thách để trở thành lớp xuất sắc nhất!" : "đã xuất sắc vượt qua mọi đối thủ và rung chuông vàng!"}
            </div>

            {/* Bell animation */}
            <div className="bell-wrap" style={{ fontSize:52, marginBottom:28, filter:"drop-shadow(0 8px 20px rgba(251,191,36,.5))" }}>
              <span className="bell-swing">🔔</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize:64, marginBottom:14 }}>🔔</div>
            <div style={{ fontSize:24, fontWeight:800, color:"rgba(255,255,255,.6)", marginBottom:8 }}>
              Cuộc thi kết thúc
            </div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,.35)", marginBottom:28 }}>
              Tất cả học sinh đều rất xuất sắc!
            </div>
          </>
        )}

        {/* Contest info chips */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:22 }}>
          {[contestName, subjLabel, `Lớp ${gradeLabel}`, `📅 ${today}`].map(t=>(
            <div key={t} className="sp-chip" style={{fontSize:12,padding:"5px 14px"}}>{t}</div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display:"flex", gap:10, width:"100%", marginBottom:20 }}>
          <div className="win-stat">
            <div className="win-stat-v">{players}</div>
            <div className="win-stat-l">{isTeamMode?"Lớp tham gia":"Thí sinh"}</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-v">{questionsPlayed}</div>
            <div className="win-stat-l">Câu đã thi</div>
          </div>
          <div className="win-stat">
            <div className="win-stat-v">{elimCount}</div>
            <div className="win-stat-l">{isTeamMode?"Lớp loại":"HS bị loại"}</div>
          </div>
          {bonusRound > 0 && (
            <div className="win-stat" style={{borderColor:"rgba(167,139,250,.3)"}}>
              <div className="win-stat-v" style={{color:"#A78BFA"}}>{bonusRound}</div>
              <div className="win-stat-l">Câu phụ AI</div>
            </div>
          )}
        </div>

        {/* Diễn biến toggle */}
        {log.length > 0 && (
          <div style={{ width:"100%", marginBottom:20 }}>
            <button onClick={()=>setShowLog(s=>!s)}
              style={{ background:"none", border:"1px solid rgba(255,255,255,.15)", color:"rgba(255,255,255,.45)", borderRadius:8, padding:"6px 16px", fontSize:12.5, fontWeight:600, cursor:"pointer", fontFamily:"inherit", width:"100%", marginBottom:6 }}>
              {showLog?"▲ Ẩn diễn biến":"▼ Xem diễn biến cuộc thi"}
            </button>
            {showLog && (
              <div className="win-log">
                <div style={{ fontSize:9, fontWeight:800, color:"rgba(255,255,255,.28)", letterSpacing:2, textTransform:"uppercase", marginBottom:7 }}>Diễn biến</div>
                {log.map((l,i)=>(
                  <div key={i} style={{ fontSize:12, color:"rgba(255,255,255,.4)", padding:"3px 0", borderBottom:"1px solid rgba(255,255,255,.05)", lineHeight:1.5 }}>{l}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div style={{ display:"flex", gap:12, width:"100%" }}>
          <button onClick={onFinish}
            style={{ flex:1, background:"linear-gradient(135deg,#FBBF24,#D97706)", color:"#fff", border:"none", borderRadius:14, padding:"15px 24px", fontSize:16, fontWeight:900, cursor:"pointer", fontFamily:"inherit", letterSpacing:.3, boxShadow:"0 8px 28px rgba(217,119,6,.45)", display:"flex", alignItems:"center", justifyContent:"center", gap:9 }}>
            <Ic.Chk /> Lưu kết quả &amp; Kết thúc
          </button>
        </div>

        {/* Footer credit */}
        <div style={{ marginTop:22, fontSize:11, color:"rgba(255,255,255,.2)", textAlign:"center" }}>
          Rung Chuông Vàng · THCS Lý Tự Trọng · Tây Ninh
        </div>
      </div>
    </div>
  );
}

// ─────────── ROUND TRANSITION SCREEN ────────────
function RoundTransitionScreen({ round, totalRounds, activeCount, isTeamMode, onStart, soundOn }) {
  const [countdown, setCountdown] = useState(5);
  const [revealed, setRevealed] = useState(false);
  const cfg = DEFAULT_ROUNDS[round - 1] || DEFAULT_ROUNDS[0];

  const prevCfg = round > 1 ? DEFAULT_ROUNDS[round - 2] : null;

  // Stable particle arrays
  const particles = useRef(Array.from({length:30},(_,i)=>({
    left: Math.random()*100, size: 4+Math.random()*10,
    color: [cfg.color,"#fff","rgba(255,255,255,.6)","rgba(255,255,255,.3)"][i%4],
    delay: Math.random()*5, dur: 4+Math.random()*4, isSquare: i%3===0,
  }))).current;

  const rays = useRef(Array.from({length:8},(_,i)=>({
    angle: i*45, delay: i*0.08,
  }))).current;

  // Reveal animation then countdown
  useEffect(() => {
    const revealTimer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    if (!revealed) return;
    if (countdown <= 0) { onStart(); return; }
    // escalating beeps for last 3 seconds
    if (soundOn !== false) {
      const freq = [440,523,659,784,1047][5 - countdown] || 440;
      tone(freq, countdown===1?.3:.12, "sine", .22);
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, revealed]);

  const bgGradients = {
    1: "linear-gradient(160deg,#022c22 0%,#064E3B 50%,#065F46 100%)",
    2: "linear-gradient(160deg,#431407 0%,#7C2D12 50%,#92400E 100%)",
    3: "linear-gradient(160deg,#450a0a 0%,#7F1D1D 50%,#991B1B 100%)",
    4: "linear-gradient(160deg,#020617 0%,#0C1445 40%,#1E3A5F 100%)",
  };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:200,
      background: bgGradients[round] || bgGradients[1],
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      overflow:"hidden",
    }}>

      {/* ── Animated rays behind content ── */}
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
        {rays.map((r,i) => (
          <div key={i} style={{
            position:"absolute",
            width: 2, height:"50vh",
            background:`linear-gradient(180deg,${cfg.color}00,${cfg.color}22,${cfg.color}00)`,
            transformOrigin:"bottom center",
            transform:`rotate(${r.angle}deg)`,
            animation:`rayPulse 3s ease-in-out ${r.delay}s infinite`,
            bottom:"50%", left:"50%", marginLeft:-1,
          }}/>
        ))}
      </div>

      {/* ── Confetti particles ── */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        {particles.map((p,i) => (
          <div key={i} style={{
            position:"absolute", bottom:-20, left:`${p.left}%`,
            width:p.size, height:p.isSquare?p.size:p.size*1.8,
            background:p.color,
            borderRadius: p.isSquare?3:"50%",
            animation:`confettiFall ${p.dur}s linear ${p.delay}s infinite`,
            transform:`rotate(${Math.random()*360}deg)`,
          }}/>
        ))}
        {/* Gold sparkles */}
        {Array.from({length:12},(_,i)=>(
          <div key={`sp${i}`} style={{
            position:"absolute",
            top:`${10+Math.random()*80}%`, left:`${Math.random()*100}%`,
            fontSize:16+Math.random()*16, opacity:.7,
            animation:`twinkle ${1.5+Math.random()*2}s ease-in-out ${Math.random()*3}s infinite`,
          }}>✦</div>
        ))}
      </div>

      {/* ── Glow rings ── */}
      {[120,200,300,420].map((s,i) => (
        <div key={i} style={{
          position:"absolute", width:s, height:s, borderRadius:"50%",
          border:`2px solid ${cfg.color}${["44","33","22","11"][i]}`,
          animation:`goldRingPulse ${2+i*.5}s ease-out ${i*.3}s infinite`,
        }}/>
      ))}

      {/* ── MAIN CONTENT ── */}
      <div style={{
        position:"relative", zIndex:2,
        display:"flex", flexDirection:"column", alignItems:"center",
        textAlign:"center", padding:"0 24px", maxWidth:620, width:"100%",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0) scale(1)" : "translateY(40px) scale(.92)",
        transition:"all .6s cubic-bezier(.175,.885,.32,1.275)",
      }}>

        {/* Previous round complete badge */}
        {prevCfg && round > 1 && (
          <div style={{
            display:"inline-flex", alignItems:"center", gap:6,
            background:`${prevCfg.color}22`, border:`1px solid ${prevCfg.color}44`,
            color:prevCfg.color, borderRadius:100, padding:"5px 16px",
            fontSize:12, fontWeight:800, letterSpacing:1, marginBottom:16,
            animation:"chipIn .5s ease .3s both",
          }}>
            ✓ Hoàn thành Vòng {round-1}: {prevCfg.name}
          </div>
        )}

        {/* Round emoji – large */}
        <div style={{
          fontSize:88, lineHeight:1, marginBottom:12,
          filter:`drop-shadow(0 0 40px ${cfg.color}88)`,
          animation:"trophyBounce 2s ease-in-out infinite",
        }}>
          {cfg.emoji}
        </div>

        {/* Round label */}
        <div style={{
          fontSize:11, fontWeight:900, color:`${cfg.color}99`,
          letterSpacing:5, textTransform:"uppercase", marginBottom:8,
          animation:"chipIn .5s ease .2s both",
        }}>
          Vòng {round} / {totalRounds}
        </div>

        {/* Round name – BIG */}
        <div style={{
          fontSize:54, fontWeight:900, color:"#fff", lineHeight:1.1, marginBottom:10,
          textShadow:`0 0 60px ${cfg.color}88, 0 4px 20px rgba(0,0,0,.5)`,
          animation:"chipIn .6s ease .3s both",
        }}>
          {cfg.name}
        </div>

        {/* Desc */}
        <div style={{
          fontSize:15, color:"rgba(255,255,255,.55)", marginBottom:28,
          lineHeight:1.6, maxWidth:440,
          animation:"chipIn .6s ease .4s both",
        }}>
          {cfg.desc}
        </div>

        {/* Round progress bar */}
        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:28, animation:"chipIn .5s ease .5s both" }}>
          {Array.from({length:totalRounds},(_,i)=>(
            <div key={i} style={{
              height:8, borderRadius:100,
              width: i===round-1?60:36,
              background: i<round ? cfg.color : "rgba(255,255,255,.15)",
              boxShadow: i===round-1?`0 0 12px ${cfg.color}88`:"none",
              transition:"all .4s",
            }}/>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:12, marginBottom:32, animation:"chipIn .5s ease .55s both" }}>
          <div style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)", borderRadius:14, padding:"13px 22px", textAlign:"center" }}>
            <div style={{ fontSize:30, fontWeight:900, color:cfg.color, lineHeight:1 }}>{activeCount}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", fontWeight:700, marginTop:4, letterSpacing:1, textTransform:"uppercase" }}>{isTeamMode?"Lớp còn lại":"HS còn lại"}</div>
          </div>
          {/* Countdown ring */}
          <div style={{ background:"rgba(255,255,255,.08)", border:`2px solid ${cfg.color}66`, borderRadius:14, padding:"13px 22px", textAlign:"center", position:"relative" }}>
            <div style={{ fontSize:30, fontWeight:900, color:cfg.color, lineHeight:1, transition:"all .3s" }}>{countdown}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", fontWeight:700, marginTop:4, letterSpacing:1, textTransform:"uppercase" }}>Giây</div>
            {/* Ring border animation */}
            <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", transform:"rotate(-90deg)" }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke={cfg.color} strokeWidth="3" opacity=".2"/>
              <circle cx="50" cy="50" r="46" fill="none" stroke={cfg.color} strokeWidth="3"
                strokeDasharray={`${2*Math.PI*46}`}
                strokeDashoffset={`${2*Math.PI*46*(1-countdown/5)}`}
                strokeLinecap="round"
                style={{transition:"stroke-dashoffset 1s linear"}}/>
            </svg>
          </div>
        </div>

        {/* Start now button */}
        <button onClick={() => { setCountdown(0); }}
          style={{
            background: `linear-gradient(135deg,${cfg.color},${cfg.color}cc)`,
            color:"#fff", border:"none", borderRadius:16,
            padding:"16px 52px", fontSize:17, fontWeight:900,
            cursor:"pointer", fontFamily:"inherit", letterSpacing:.5,
            boxShadow:`0 8px 32px ${cfg.color}55`,
            animation:"chipIn .6s ease .6s both",
            transition:"all .17s",
          }}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px) scale(1.04)"}
          onMouseLeave={e=>e.currentTarget.style.transform="translateY(0) scale(1)"}>
          {round===1 ? "▶ Bắt đầu cuộc thi!" : `▶ Vào Vòng ${round} ngay!`}
        </button>

        {/* Round list mini-map */}
        <div style={{ display:"flex", gap:10, marginTop:28, animation:"chipIn .5s ease .7s both", flexWrap:"wrap", justifyContent:"center" }}>
          {DEFAULT_ROUNDS.slice(0,totalRounds).map((r,i) => (
            <div key={r.id} style={{
              display:"flex", alignItems:"center", gap:5,
              padding:"4px 12px", borderRadius:100, fontSize:11.5, fontWeight:700,
              background: i===round-1?`${r.color}25`:"rgba(255,255,255,.05)",
              border:`1px solid ${i===round-1?r.color+"66":"rgba(255,255,255,.1)"}`,
              color: i<round?r.color:i===round-1?r.color:"rgba(255,255,255,.3)",
            }}>
              {i<round-1?"✓":r.emoji} {r.name}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rayPulse{0%,100%{opacity:.2;height:45vh}50%{opacity:.7;height:52vh}}
      `}</style>
    </div>
  );
}

// ─────────── GAME SCREEN ────────────
function GameScreen({ contest, questions, onEnd, soundOn }) {
  const snd = (fn) => { if (soundOn !== false) fn(); };
  const [phase, setPhase] = useState("splash"); // splash -> setup -> roundTransition -> playing -> result
  const [currentRound, setCurrentRound] = useState(1);
  const [pInput, setPInput] = useState("");
  // Team mode: which class chips are selected
  const initTeamSel = () => {
    const list = contest.teamList || [];
    return list.map((name,i) => ({id:i, name, s:"ok"}));
  };
  const [teamChips, setTeamChips] = useState(() => {
    // Pre-populate selectable chips from contest.teamList
    if (contest.mode === "team" && contest.teamList?.length) {
      return contest.teamList.map((name,i) => ({id:i, name, selected:true}));
    }
    return [];
  });
  const [players, setPlayers] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [selE, setSelE] = useState([]);
  const [timerRunning, setTimerRunning] = useState(true);
  const [timerSeed, setTimerSeed] = useState(0); // increment to reset timer
  const [timeExpired, setTimeExpired] = useState(false);
  const [log, setLog] = useState([]);
  const [questionsPlayed, setQuestionsPlayed] = useState(0);
  const [winner, setWinner] = useState(null);
  const [bgMusicOn, setBgMusicOn] = useState(soundOn !== false);
  const bgVolRef = useRef(0.22);
  const [showGuide, setShowGuide] = useState(false); // floating guide panel
  // Bonus questions (AI-generated when main pool exhausted)
  const [bonusQs, setBonusQs]           = useState([]);
  const [bonusLoading, setBonusLoading] = useState(false);
  const [bonusError, setBonusError]     = useState("");
  const [allElimDialog, setAllElimDialog] = useState(false);
  const [prevSubject, setPrevSubject]   = useState("");
  const [prevDiff, setPrevDiff]         = useState("Cơ bản");
  const [bonusRound, setBonusRound]     = useState(0); // how many bonus questions generated

  // Start/stop background music during playing phase
  useEffect(() => {
    if (phase === "playing" && bgMusicOn) {
      startBgMusic(bgVolRef.current);
    } else {
      BgMusic.stop();
    }
    return () => { if (phase !== "playing") BgMusic.stop(); };
  }, [phase, bgMusicOn]);

  const toggleBgMusic = () => {
    setBgMusicOn(m => {
      const next = !m;
      if (next) startBgMusic(bgVolRef.current);
      else BgMusic.stop();
      return next;
    });
  };

  const isTeamMode = contest.mode === "team";
  const unitLabel  = isTeamMode ? "lớp" : "HS";
  const unitIcon   = isTeamMode ? "🏫" : "👤";
  const shuffleArray = arr => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const shuffledMainQs = useRef(null);
  if (!shuffledMainQs.current) {
    const raw = questions.filter(q => contest.questionIds.includes(q.id));
    shuffledMainQs.current = shuffleArray(raw);
  }

  const useRounds = contest.useRounds && contest.rounds?.length > 0;
  const totalRounds = useRounds ? contest.rounds.length : 1;

  // Distribute questions into rounds
  const roundPools = useRef(null);
  if (!roundPools.current && shuffledMainQs.current) {
    if (useRounds) {
      let remaining = [...shuffledMainQs.current];
      roundPools.current = contest.rounds.map(r => {
        const take = Math.min(r.questionCount || 5, remaining.length);
        return remaining.splice(0, take);
      });
    } else {
      roundPools.current = [shuffledMainQs.current];
    }
  }

  const currentPool = roundPools.current ? (roundPools.current[currentRound - 1] || []) : (shuffledMainQs.current || []);
  const mainQs = currentPool;
  const cqs = [...mainQs, ...bonusQs];
  const active  = players.filter(p => p.s === "ok");
  const elim    = players.filter(p => p.s === "out");
  const q       = cqs[qIdx] || null;

  // Guard: q not ready yet (e.g. during round transition)
  if (phase === "playing" && !q) {
    return (
      <div className="gs" style={{ alignItems:"center", justifyContent:"center" }}>
        <div style={{ color:"rgba(255,255,255,.5)", fontSize:15 }}>⏳ Đang tải câu hỏi...</div>
      </div>
    );
  }
  const isMainExhausted = qIdx >= mainQs.length;          // all main Qs done
  const isLast  = qIdx + 1 >= cqs.length;                 // last in combined pool

  const roundCfg = useRounds ? (DEFAULT_ROUNDS[currentRound - 1] || DEFAULT_ROUNDS[0]) : null;
  const timePerQ = useRounds
    ? (contest.rounds[currentRound - 1]?.timePerQuestion || roundCfg?.defaultTime || 30)
    : contest.timePerQuestion;

  const [startError, setStartError] = useState("");

  // ── Setup ──
  const startGame = () => {
    setStartError("");
    if (isTeamMode) {
      const sel = teamChips.filter(t => t.selected);
      if (sel.length < 2) { setStartError("Cần ít nhất 2 lớp tham gia!"); return; }
      setPlayers(sel.map((t, i) => ({ id: i, name: t.name, s: "ok" })));
    } else {
      const names = pInput.split("\n").map(n => n.trim()).filter(Boolean);
      if (names.length < 2) { setStartError("Cần ít nhất 2 người chơi!"); return; }
      setPlayers(names.map((name, i) => ({ id: i, name, s: "ok" })));
    }
    setPhase(useRounds ? "roundTransition" : "playing");
    setTimerRunning(true);
    snd(Sounds.start);
  };

  const autoGenerate = () => {
    const n = Math.max(2, contest.totalPlayers || 30);
    setPInput(genBibs(n).join("\n"));
  };

  const toggleTeamChip = id => setTeamChips(prev => prev.map(t => t.id === id ? {...t, selected: !t.selected} : t));
  const teamSelected = teamChips.filter(t => t.selected);

  // ── Timer handlers ──
  const handleTimerEnd = () => {
    setTimerRunning(false);
    setTimeExpired(true);
    // Không tự hiện đáp án — giáo viên phải nhấn "Hiện đáp án"
    snd(Sounds.timeEnd);
  };

  const resetTimer = () => {
    setTimerSeed(s => s + 1);
    setTimerRunning(true);
    setTimeExpired(false);
  };

  // ── Reveal ──
  const revealAnswer = () => {
    setRevealed(true);
    setTimerRunning(false);
    snd(Sounds.reveal);
  };

  // ── Student interaction ──
  const toggleElim = (pid) => {
    if (!revealed || confirmed) return;
    if (players.find(p => p.id === pid)?.s === "out") return;
    setSelE(prev => prev.includes(pid) ? prev.filter(x => x !== pid) : [...prev, pid]);
  };

  const simulateRandom = () => {
    const act = players.filter(p => p.s === "ok");
    if (act.length <= 1) return;
    const pct = 0.25 + Math.random() * 0.45; // 25-70% eliminated
    const count = Math.max(1, Math.min(Math.floor(act.length * pct), act.length - 1));
    const shuffled = [...act].sort(() => Math.random() - 0.5);
    setSelE(shuffled.slice(0, count).map(p => p.id));
  };

  // ── Confirm round ──
  const confirmRound = () => {
    const updated = players.map(p => selE.includes(p.id) ? { ...p, s: "out" } : p);
    setPlayers(updated);
    const newActive = updated.filter(p => p.s === "ok");
    const elimCount = selE.length;
    const qNum = qIdx + 1;

    setLog(prev => [...prev, elimCount === 0
      ? `Câu ${qNum}: Tất cả ${active.length} ${unitLabel} đều đúng`
      : `Câu ${qNum}: Loại ${elimCount} ${unitLabel} → còn ${newActive.length}`
    ]);
    setQuestionsPlayed(n => n + 1);
    setSelE([]);
    setConfirmed(true);
    if (elimCount > 0) snd(Sounds.elim); else snd(Sounds.correct);

    // Check end conditions
    if (newActive.length === 1) {
      setWinner(newActive[0].name);
      snd(Sounds.win);
      setTimeout(() => setPhase("result"), 600);
      return;
    }
    if (newActive.length === 0) {
      // Tất cả bị loại cùng lúc → hiện dialog cho GV xử lý
      setAllElimDialog(true);
      return;
    }
    // isLast but still multiple players → check rounds
    if (isLast) {
      if (useRounds && currentRound < totalRounds && newActive.length > 1) {
        // Advance to next round
        setCurrentRound(r => r + 1);
        setQIdx(0);
        setBonusQs([]);
        setRevealed(false); setConfirmed(false); setSelE([]);
        setTimerSeed(s => s + 1); setTimerRunning(false); setTimeExpired(false);
        setTimeout(() => setPhase("roundTransition"), 400);
      }
      // else: stay confirmed, bonus button or end button will handle it
    }
  };

  // ── Next question ──
  const nextQ = () => {
    setQIdx(i => i + 1);
    setRevealed(false);
    setConfirmed(false);
    setSelE([]);
    setTimerSeed(s => s + 1);
    setTimerRunning(true);
    setTimeExpired(false);
    snd(Sounds.nextQ);
  };

  // ── Bonus question generator ──
  // Độ khó tăng dần theo lượt: 1-2=Trung bình, 3-4=Khó, 5+=Rất khó
  const getBonusDifficulty = (round, activeCount) => {
    if (activeCount <= 2) return "Rất khó";
    if (round <= 2) return "Trung bình";
    if (round <= 4) return "Khó";
    return "Rất khó";
  };

  const generateBonus = async () => {
    setBonusLoading(true); setBonusError("");
    const activeCount = players.filter(p => p.s === "ok").length;
    const round = bonusRound + 1;
    const grades = contest.grades || [contest.grade];
    const grade  = grades[0] || "6";
    const targetDiff = getBonusDifficulty(round, activeCount);

    const systemPrompt = `Bạn là AI tạo câu hỏi phụ cho cuộc thi Rung Chuông Vàng THCS.
Câu hỏi chính đã hết, còn ${activeCount} học sinh/lớp trên sàn, đây là lượt phụ số ${round}.
Yêu cầu bắt buộc:
- Độ khó MỤC TIÊU: ${targetDiff} (PHẢI đúng mức này, không được dễ hơn)
- Phù hợp lớp ${grade}, KHÔNG lặp môn vừa dùng (${prevSubject||"chưa có"})
- Ngắn gọn, đọc được thành tiếng trên sân khấu, 4 đáp án A/B/C/D, 1 đáp án đúng
${activeCount <= 3 ? "- ĐÂY LÀ CÂU PHÂN LOẠI CUỐI, phải đủ khó để loại đến người cuối cùng" : ""}
${activeCount === 2 ? "- Chỉ còn 2 người, câu hỏi phải RẤT KHÓ và có tính phân loại cao nhất" : ""}`;

    const userPrompt = `Khối: Lớp ${grade} | Lượt phụ: ${round} | HS còn lại: ${activeCount}
Môn câu trước: ${prevSubject||"chưa có"} | Độ khó câu trước: ${prevDiff}
Độ khó yêu cầu lần này: ${targetDiff}

Trả về JSON hợp lệ duy nhất (KHÔNG markdown, KHÔNG backtick):
{"content":"Câu hỏi?","a":"...","b":"...","c":"...","d":"...","correct":"a","subject":"Tên môn","difficulty":"${targetDiff}","note":"Lý do phân loại"}`;

    try {
      const raw = await callAI({ prompt: userPrompt, system: systemPrompt, maxTokens: 600 });
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      const newQ = { ...parsed, id: Date.now(), grade, lesson:`Câu phụ #${round}`, week:"", _bonus:true };
      setBonusQs(prev => {
        const updated = [...prev, newQ];
        // auto-advance index to this new question
        setQIdx(mainQs.length + updated.length - 1);
        return updated;
      });
      setPrevSubject(parsed.subject||""); setPrevDiff(targetDiff);
      setBonusRound(round);
      setRevealed(false); setConfirmed(false); setSelE([]);
      setTimerSeed(s=>s+1); setTimerRunning(true); setTimeExpired(false);
      snd(Sounds.start);
    } catch(e) {
      const msg = e.message || "";
      const isAuthErr = msg.includes("401") || msg.includes("xác thực") || msg.includes("API Key");
      setBonusError(isAuthErr ? "__auth__" : "Không tạo được câu hỏi phụ. Kiểm tra kết nối và thử lại.");
    }
    setBonusLoading(false);
  };

  const endEarly = () => {
    const act = players.filter(p => p.s === "ok");
    setWinner(act.length > 0 ? act.map(p => p.name).join(" & ") : null);
    setPhase("result");
  };

  const finishGame = () => {
    const act = players.filter(p => p.s === "ok");
    onEnd({
      winner: winner || (act.length > 0 ? act.map(p => p.name).join(" & ") : "Không có"),
      questionsPlayed: questionsPlayed,
      players: players.length,
      eliminated: players.filter(p => p.s === "out").length,
    });
  };

  // ══════════════════ SPLASH PHASE ══════════════════
  if (phase === "splash") return (
    <SplashScreen contest={contest} soundOn={soundOn} onReady={() => setPhase("setup")} />
  );

  // ══════════════════ ROUND TRANSITION PHASE ══════════════════
  if (phase === "roundTransition") return (
    <RoundTransitionScreen
      round={currentRound}
      totalRounds={totalRounds}
      activeCount={players.filter(p => p.s === "ok").length || players.length}
      isTeamMode={isTeamMode}
      soundOn={soundOn}
      onStart={() => { setPhase("playing"); snd(Sounds.start); }}
    />
  );

  // ══════════════════ SETUP PHASE ══════════════════
  if (phase === "setup") return (
    <div className="gs" style={{ alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: isTeamMode ? 680 : 600 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>{isTeamMode ? "🏫" : "🔔"}</div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 900, marginBottom: 8 }}>{contest.name}</h1>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              `${(contest.subjects||[contest.subject]).map(s=>`${SMETA[s]?.emoji} ${s}`).join(' · ')}`,
              `Lớp ${(contest.grades||[contest.grade]).join(', ')}`,
              `📝 ${cqs.length} câu hỏi`,
              `⏱ ${contest.timePerQuestion}s/câu`,
              isTeamMode ? "🏆 Thi theo lớp" : "👤 Thi cá nhân",
            ].map(t => (
              <span key={t} style={{ background: isTeamMode ? "rgba(251,191,36,.15)" : "rgba(255,255,255,.1)", color: "rgba(255,255,255,.75)", padding: "4px 12px", borderRadius: 100, fontSize: 13, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── HƯỚNG DẪN TỪNG BƯỚC ── */}
        <div style={{ background:"rgba(251,191,36,.08)", border:"1px solid rgba(251,191,36,.2)", borderRadius:14, padding:"16px 18px", marginBottom:18 }}>
          <div style={{ fontSize:10.5, fontWeight:800, color:"rgba(251,191,36,.6)", letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>
            📋 Quy trình tổ chức cuộc thi
          </div>
          <div style={{ display:"flex", gap:0, flexDirection:"column" }}>
            {[
              { step:"1", icon:"👥", label: isTeamMode ? "Chọn lớp tham gia" : "Nhập danh sách thí sinh", desc: isTeamMode ? "Tích chọn các lớp có mặt (≥ 2 lớp)" : "Nhập số đeo mỗi dòng hoặc tạo tự động", done:false, active:true },
              { step:"2", icon:"▶️", label:"Bắt đầu cuộc thi", desc:"Nhấn nút 'Bắt đầu thi' để vào màn hình câu hỏi", done:false, active:false },
              { step:"3", icon:"❓", label:"Trả lời câu hỏi", desc:"HS trả lời trong thời gian đếm ngược", done:false, active:false },
              { step:"4", icon:"👆", label:"Chấm điểm & loại HS", desc:"Nhấn vào tên HS trả lời SAI, rồi Xác nhận kết quả", done:false, active:false },
              { step:"5", icon:"➡️", label:"Sang câu tiếp theo", desc:"Tiếp tục cho đến khi còn 1 người/lớp", done:false, active:false },
              { step:"6", icon:"🏆", label:"Vinh danh người thắng", desc:"Màn hình chiến thắng tự động hiện khi kết thúc", done:false, active:false },
            ].map((s,i) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", paddingBottom: i<5?10:0, marginBottom: i<5?10:0, borderBottom: i<5?"1px solid rgba(255,255,255,.06)":"none" }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                  <div style={{ width:26, height:26, borderRadius:50, background: s.active?"#FBBF24":"rgba(255,255,255,.1)", color: s.active?"#1E293B":"rgba(255,255,255,.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, flexShrink:0 }}>
                    {s.active ? s.icon : s.step}
                  </div>
                  {i<5 && <div style={{ width:1, height:10, background:"rgba(255,255,255,.1)", marginTop:3 }}/>}
                </div>
                <div style={{ paddingTop:3 }}>
                  <div style={{ fontSize:13, fontWeight: s.active?800:600, color: s.active?"#FBBF24":"rgba(255,255,255,.55)", lineHeight:1.3 }}>{s.label}</div>
                  <div style={{ fontSize:11.5, color:"rgba(255,255,255,.3)", marginTop:2 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isTeamMode ? (
          /* ── TEAM MODE SETUP ── */
          <div className="scard" style={{ maxWidth: 620 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.4)", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 10 }}>
              Chọn các lớp tham gia thi
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>
                Đã chọn <strong style={{ color: "#FBBF24" }}>{teamSelected.length}</strong> / {teamChips.length} lớp
              </span>
              <div style={{ display: "flex", gap: 7 }}>
                <button className="tbtn" onClick={() => setTeamChips(p => p.map(t => ({...t, selected: false})))}>Bỏ tất cả</button>
                <button className="tbtn run" onClick={() => setTeamChips(p => p.map(t => ({...t, selected: true})))}>Chọn tất cả</button>
              </div>
            </div>
            {/* Group by grade */}
            {(contest.grades||[contest.grade]).map(g => {
              const gradeChips = teamChips.filter(t => t.name.startsWith(g));
              if (!gradeChips.length) return null;
              return (
                <div key={g} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: "rgba(255,255,255,.32)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 7 }}>
                    Khối {g} · {gradeChips.filter(t=>t.selected).length}/{gradeChips.length} lớp
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(80px,1fr))", gap: 7 }}>
                    {gradeChips.map(t => (
                      <div key={t.id} className={`tsg-chip ${t.selected ? "on" : ""}`}
                        onClick={() => toggleTeamChip(t.id)}>
                        {t.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 14 }}>
              <button className="btn btn-p btn-lg" style={{ width: "100%", justifyContent: "center" }}
                disabled={teamSelected.length < 2}
                onClick={startGame}>
                <Ic.Play /> Bắt đầu thi ({teamSelected.length} lớp)
              </button>
            </div>
          </div>
        ) : (
          /* ── INDIVIDUAL MODE SETUP ── */
          <div className="scard">
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.4)", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>Danh sách học sinh tham gia</div>
            <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 9, padding: "8px 12px", fontSize: 12.5, color: "rgba(255,255,255,.42)", marginBottom: 10, lineHeight: 1.6 }}>
              💡 Nhập số đeo mỗi học sinh một dòng (VD: Số 01, Số 02...). Hoặc nhấn <strong style={{ color: "rgba(251,191,36,.8)" }}>Tạo danh sách tự động</strong>.
            </div>
            <textarea className="sta" rows={10}
              placeholder={"Số 01\nSố 02\nSố 03\n..."}
              value={pInput} onChange={e => setPInput(e.target.value)} />
            <div style={{ color: "rgba(255,255,255,.28)", fontSize: 12, margin: "5px 0 13px" }}>
              {pInput.split("\n").filter(s => s.trim()).length} học sinh đã nhập
            </div>
            <div style={{ display: "flex", gap: 9 }}>
              <button className="btn btn-g" style={{ flex: 1, justifyContent: "center", background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.14)", color: "rgba(255,255,255,.65)" }}
                onClick={autoGenerate}>⚡ Tạo {contest.totalPlayers} HS tự động</button>
              <button className="btn btn-p btn-lg" style={{ flex: 1, justifyContent: "center" }}
                disabled={pInput.split("\n").filter(s => s.trim()).length < 2}
                onClick={startGame}><Ic.Play /> Bắt đầu thi</button>
            </div>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: 14 }}>
          {startError && (
            <div style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)", borderRadius:8, padding:"8px 14px", color:"#FCA5A5", fontSize:13, fontWeight:600, marginBottom:10 }}>
              ⚠ {startError}
            </div>
          )}
          <button onClick={() => onEnd(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.3)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>← Quay lại danh sách</button>
        </div>
      </div>
    </div>
  );

  // ══════════════════ RESULT PHASE ══════════════════
  if (phase === "result") {
    const gradeLabel = (contest.grades||[contest.grade]).join(', ');
    const subjLabel  = (contest.subjects||[contest.subject]).map(s=>`${SMETA[s]?.emoji} ${s}`).join(' · ');
    const today = new Date().toLocaleDateString("vi-VN", {day:"2-digit",month:"2-digit",year:"numeric"});
    return <WinnerScreen
      winner={winner} isTeamMode={isTeamMode}
      contestName={contest.name}
      gradeLabel={gradeLabel} subjLabel={subjLabel} today={today}
      players={players.length} questionsPlayed={questionsPlayed} elimCount={elim.length}
      bonusRound={bonusRound} log={log}
      onFinish={finishGame} soundOn={soundOn}
    />;
  }

  // ══════════════════ PLAYING PHASE ══════════════════
  return (
    <div className="gs" style={{ position:"relative" }}>

      {/* ── ALL ELIMINATED DIALOG ── */}
      {allElimDialog && (() => {
        const lastElim = players.filter(p => p.s === "out" && selE.includes(p.id));
        const allOut   = players.filter(p => p.s === "out");
        const reviveTargets = lastElim.length > 0 ? lastElim : allOut.slice(-1);
        return (
          <div style={{ position:"fixed", inset:0, zIndex:300, background:"rgba(0,0,0,.75)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
            <div style={{ background:"#fff", borderRadius:20, padding:"28px 28px 24px", maxWidth:460, width:"100%", boxShadow:"0 32px 80px rgba(0,0,0,.4)", animation:"roundIn .35s ease" }}>
              {/* Icon */}
              <div style={{ textAlign:"center", fontSize:52, marginBottom:10 }}>🔔</div>

              {/* Title */}
              <h3 style={{ textAlign:"center", fontSize:19, fontWeight:900, color:"#1E293B", marginBottom:6 }}>
                Tất cả thí sinh đã bị loại!
              </h3>
              <p style={{ textAlign:"center", fontSize:13.5, color:"#64748B", marginBottom:18, lineHeight:1.6 }}>
                Câu hỏi vừa rồi loại đồng thời <strong style={{color:"#EF4444"}}>{reviveTargets.length} {isTeamMode?"lớp":"thí sinh"}</strong>.
                Giáo viên chọn cách xử lý:
              </p>

              {/* Option 1: Revive last eliminated */}
              <button
                style={{ width:"100%", background:"linear-gradient(135deg,#22C55E,#16A34A)", color:"#fff", border:"none", borderRadius:13, padding:"14px 20px", fontSize:14.5, fontWeight:800, cursor:"pointer", fontFamily:"inherit", marginBottom:10, display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}
                onClick={() => {
                  // Phục hồi người bị loại câu vừa rồi
                  setPlayers(prev => prev.map(p =>
                    reviveTargets.find(r => r.id === p.id) ? {...p, s:"ok"} : p
                  ));
                  setAllElimDialog(false);
                  setConfirmed(false);
                  setRevealed(false);
                  setSelE([]);
                  setLog(prev => [...prev, `⟳ Phục hồi: ${reviveTargets.map(p=>p.name).join(", ")} trở lại thi`]);
                  // Continue to next question
                  if (!isLast) {
                    setQIdx(i => i + 1);
                    setTimerSeed(s => s + 1);
                    setTimerRunning(true);
                    setTimeExpired(false);
                    snd(Sounds.nextQ);
                  }
                }}>
                <span style={{fontSize:18}}>🔄</span>
                Phục hồi {reviveTargets.map(p=>p.name).join(", ")} — tiếp tục thi
              </button>

              {/* Option 2: Revive everyone and redo question */}
              {allOut.length > reviveTargets.length && (
                <button
                  style={{ width:"100%", background:"linear-gradient(135deg,#F59E0B,#D97706)", color:"#fff", border:"none", borderRadius:13, padding:"14px 20px", fontSize:14.5, fontWeight:800, cursor:"pointer", fontFamily:"inherit", marginBottom:10, display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}
                  onClick={() => {
                    setPlayers(prev => prev.map(p => ({...p, s:"ok"})));
                    setAllElimDialog(false);
                    setConfirmed(false);
                    setRevealed(false);
                    setSelE([]);
                    setTimerSeed(s => s + 1);
                    setTimerRunning(true);
                    setTimeExpired(false);
                    setLog(prev => [...prev, `⟳ Phục hồi toàn bộ ${allOut.length} ${isTeamMode?"lớp":"HS"} — làm lại câu hỏi`]);
                  }}>
                  <span style={{fontSize:18}}>🔄</span>
                  Phục hồi tất cả — làm lại câu này
                </button>
              )}

              {/* Option 3: Use AI bonus question immediately */}
              <button
                style={{ width:"100%", background:"linear-gradient(135deg,#7C3AED,#5B21B6)", color:"#fff", border:"none", borderRadius:13, padding:"14px 20px", fontSize:14.5, fontWeight:800, cursor:"pointer", fontFamily:"inherit", marginBottom:10, display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}
                onClick={() => {
                  setPlayers(prev => prev.map(p =>
                    reviveTargets.find(r => r.id === p.id) ? {...p, s:"ok"} : p
                  ));
                  setAllElimDialog(false);
                  setConfirmed(true);
                  setRevealed(true);
                  setLog(prev => [...prev, `⟳ Phục hồi ${reviveTargets.map(p=>p.name).join(", ")} → dùng câu phụ AI phân định`]);
                  generateBonus();
                }}>
                <span style={{fontSize:18}}>✨</span>
                Phục hồi + Dùng câu phụ AI phân định ngay
              </button>

              <div style={{ display:"flex", gap:8 }}>
                {/* Option 4: End with no winner */}
                <button
                  style={{ flex:1, background:"#F1F5F9", color:"#64748B", border:"1.5px solid #E2E8F0", borderRadius:11, padding:"12px", fontSize:13.5, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}
                  onClick={() => {
                    setWinner(null);
                    setAllElimDialog(false);
                    setLog(prev => [...prev, "🏁 Kết thúc: không có người chiến thắng"]);
                    setTimeout(() => setPhase("result"), 300);
                  }}>
                  Kết thúc không có người thắng
                </button>
              </div>

              <p style={{ textAlign:"center", fontSize:11.5, color:"#94A3B8", marginTop:12 }}>
                Tình huống bất ngờ — giáo viên quyết định cách xử lý
              </p>
            </div>
          </div>
        );
      })()}
      {/* Top bar */}
      <div className="gtb">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>🔔</span>
          <div className="gtb-name">{contest.name}</div>
          {useRounds && roundCfg && (
            <div className="round-pill" style={{ background: roundCfg.bg, color: roundCfg.color, borderColor: roundCfg.color+"55" }}>
              {roundCfg.emoji} Vòng {currentRound}: {roundCfg.name}
            </div>
          )}
        </div>
        <div className="gtb-meta">
          <span className="gmeta-tag">{(contest.subjects||[contest.subject]).map(s=>`${SMETA[s]?.emoji||''} ${s}`).join(' · ')}</span>
          <span className="gmeta-tag">Lớp {(contest.grades||[contest.grade]).join(', ')}</span>
          <span className="gmeta-tag" style={{ color: "#FBBF24", borderColor: "rgba(251,191,36,.25)", background: "rgba(251,191,36,.1)" }}>
            📅 {new Date().toLocaleDateString("vi-VN")}
          </span>
          <button
            className={`snd-btn ${!bgMusicOn?"muted":""}`}
            onClick={toggleBgMusic}
            title={bgMusicOn ? "Tắt nhạc nền" : "Bật nhạc nền"}>
            <span style={{fontSize:13}}>{bgMusicOn ? "🎵" : "🔇"}</span>
            <span>Nhạc nền</span>
          </button>
          <button
            className={`snd-btn ${soundOn===false?"muted":""}`}
            title="Âm thanh hiệu ứng"
            style={{ opacity: soundOn===false ? .45 : 1 }}>
            {soundOn !== false ? <Ic.Vol/> : <Ic.VolOff/>} SFX
          </button>
          <button
            className={`snd-btn ${showGuide?"":"" }`}
            onClick={() => setShowGuide(g=>!g)}
            style={{ background: showGuide?"rgba(251,191,36,.25)":"rgba(255,255,255,.09)", borderColor: showGuide?"rgba(251,191,36,.4)":"rgba(255,255,255,.14)" }}
            title="Hướng dẫn tổ chức thi">
            <span style={{fontSize:13}}>📋</span>
            <span>Hướng dẫn</span>
          </button>
          <button onClick={endEarly} style={{ background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)", color: "#FCA5A5", padding: "6px 13px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600, fontFamily: "inherit" }}>
            Kết thúc sớm
          </button>
        </div>
      </div>

      {/* ── FLOATING GUIDE PANEL ── */}
      {showGuide && (
        <div style={{ position:"absolute", top:64, right:16, zIndex:50, width:310, background:"rgba(10,22,40,.97)", border:"1px solid rgba(251,191,36,.3)", borderRadius:16, padding:"16px 18px", boxShadow:"0 20px 50px rgba(0,0,0,.5)", backdropFilter:"blur(12px)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:13 }}>
            <div style={{ fontSize:11, fontWeight:800, color:"rgba(251,191,36,.7)", letterSpacing:2, textTransform:"uppercase" }}>📋 Quy trình thi</div>
            <button onClick={()=>setShowGuide(false)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.4)", fontSize:18, cursor:"pointer", lineHeight:1, padding:"0 2px" }}>×</button>
          </div>
          {[
            { icon:"❓", label:"Đọc câu hỏi cho HS", desc:"Đọc to, rõ ràng để mọi HS nghe rõ", current: !revealed && !confirmed },
            { icon:"⏱️", label:"Đếm ngược thời gian", desc:"HS viết/giơ bảng đáp án trong thời hạn", current: !revealed && !confirmed && timerRunning },
            { icon:"👁️", label:"Hiện đáp án đúng", desc:"Nhấn 'Hiện đáp án' hoặc đợi hết giờ", current: !revealed && !confirmed },
            { icon:"👆", label:"Đánh dấu HS sai", desc:"Nhấn tên HS/lớp trả lời SAI → đỏ", current: revealed && !confirmed },
            { icon:"🎲", label:"Hoặc Ngẫu nhiên", desc:"Nhấn '🎲 Ngẫu nhiên' để mô phỏng tự động", current: revealed && !confirmed },
            { icon:"✅", label:"Xác nhận kết quả", desc:"Nhấn 'Xác nhận' → HS bị loại, sang câu mới", current: revealed && !confirmed },
            { icon:"➡️", label:"Câu tiếp theo", desc:"Tiếp tục cho đến khi còn 1 người/lớp", current: confirmed && !isLast },
            { icon:"✨", label:"Câu phụ AI (nếu hết pool)", desc:"Nhấn 'Sinh câu phụ' khi hết câu chính", current: confirmed && isLast && active.length > 1 },
            { icon:"🏆", label:"Kết thúc & Vinh danh", desc:"Màn hình chiến thắng tự động xuất hiện", current: false },
          ].map((step, i) => (
            <div key={i} style={{ display:"flex", gap:9, alignItems:"flex-start", padding:"7px 0", borderBottom: i<8?"1px solid rgba(255,255,255,.05)":"none",
              background: step.current?"rgba(251,191,36,.07)":"transparent",
              borderRadius: step.current?8:0, paddingLeft: step.current?8:0, paddingRight: step.current?8:0,
              margin: step.current?"2px -4px":"0",
              transition:"all .2s" }}>
              <div style={{ width:26, height:26, borderRadius:7, background: step.current?"#FBBF24":"rgba(255,255,255,.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0, transition:"all .2s" }}>
                {step.icon}
              </div>
              <div>
                <div style={{ fontSize:12.5, fontWeight: step.current?800:600, color: step.current?"#FBBF24":"rgba(255,255,255,.6)", lineHeight:1.3 }}>{step.label}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,.28)", marginTop:1, lineHeight:1.4 }}>{step.desc}</div>
              </div>
              {step.current && <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:50, background:"#FBBF24", flexShrink:0, marginTop:8, animation:"aiPulse 1.2s ease-in-out infinite" }}/>}
            </div>
          ))}
          <div style={{ marginTop:10, fontSize:10.5, color:"rgba(255,255,255,.2)", textAlign:"center" }}>
            Nhấn 📋 trên topbar để đóng/mở
          </div>
        </div>
      )}

      <div className="ginner">
        {/* ── Main column ── */}
        <div className="gm">
          {/* Progress + counters */}
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div className="gcnt">
              <div className="gcnt-v">{qIdx + 1}<span style={{ fontSize: 13, color: "rgba(255,255,255,.35)" }}>/{cqs.length}</span></div>
              <div className="gcnt-l">Câu hỏi</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.32)" }}>Tiến trình cuộc thi</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>{Math.round((qIdx / cqs.length) * 100)}%</span>
              </div>
              <div className="gpt"><div className="gpf" style={{ width: `${(qIdx / cqs.length) * 100}%` }} /></div>
            </div>
            <div className="gcnt" style={{ borderColor: "rgba(74,222,128,.25)" }}>
              <div className="gcnt-v" style={{ color: "#4ADE80" }}>{active.length}</div>
              <div className="gcnt-l">{isTeamMode ? "Lớp còn" : "Còn lại"}</div>
            </div>
            <div className="gcnt" style={{ borderColor: "rgba(239,68,68,.25)" }}>
              <div className="gcnt-v" style={{ color: "#F87171" }}>{elim.length}</div>
              <div className="gcnt-l">{isTeamMode ? "Lớp loại" : "Bị loại"}</div>
            </div>
          </div>

          {/* Question card */}
          <div className="gqc">
            <div className="gqn">
              <span style={{ background: q._bonus ? "rgba(124,58,237,.35)" : "rgba(255,255,255,.08)", padding: "2px 9px", borderRadius: 100, fontSize: 10.5 }}>
                {q._bonus ? `✨ Câu phụ #${bonusRound}` : `Câu ${qIdx + 1}`}
              </span>
              <span>{SMETA[q.subject]?.emoji} {q.subject} – Lớp {q.grade}</span>
              {q.lesson && !q._bonus && <span style={{ color: "rgba(255,255,255,.22)", fontSize: 10 }}>• {q.lesson}</span>}
              {q._bonus && q.note && <span style={{ color:"rgba(167,139,250,.7)", fontSize:10 }}>• {q.note}</span>}
            </div>
            <div className="gqt">{q.content}</div>
            <div className="gans">
              {["a", "b", "c", "d"].map(opt => (
                <div key={opt} className={`ga ${revealed ? (opt === q.correct ? "rc2" : "rw") : ""}`}>
                  <div className="gak">{opt.toUpperCase()}</div>
                  <div className="gat">{q[opt]}</div>
                  {revealed && opt === q.correct && <span style={{ marginLeft: "auto", fontSize: 16, flexShrink: 0 }}>✓</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Note if exists */}
          {revealed && q.note && (
            <div style={{ background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.22)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "rgba(251,191,36,.85)", display: "flex", gap: 8 }}>
              <span>💡</span><span><strong>Lưu ý:</strong> {q.note}</span>
            </div>
          )}

          {/* Control zone */}
          <div className="gctrl">
            {!revealed && (
              <>
                <button className="btn btn-p gcb" style={{ fontSize: 15 }} onClick={revealAnswer}>
                  <Ic.Eye /> Hiện đáp án đúng
                </button>
              </>
            )}
            {revealed && !confirmed && (
              <button className="btn btn-green gcb" style={{ fontSize: 15 }} onClick={confirmRound}>
                <Ic.Chk /> Xác nhận kết quả{selE.length > 0 ? ` (loại ${selE.length} ${unitLabel})` : " (tất cả đúng)"}
              </button>
            )}
            {confirmed && !isLast && (
              <button className="btn btn-p gcb" style={{ fontSize: 15 }} onClick={nextQ}>
                Câu tiếp theo ({qIdx + 2}/{cqs.length}) →
              </button>
            )}
            {confirmed && isLast && active.length <= 1 && (
              <button className="btn btn-p gcb" style={{ fontSize: 15, background:"linear-gradient(135deg,#FBBF24,#D97706)" }}
                onClick={() => { setWinner(active.map(p=>p.name).join(" & ")||null); setPhase("result"); }}>
                🏆 Kết thúc cuộc thi
              </button>
            )}
            {confirmed && isLast && active.length > 1 && (
              <div style={{ width:"100%" }}>
                <div style={{ background:"rgba(251,191,36,.12)", border:"1px solid rgba(251,191,36,.3)", borderRadius:10, padding:"10px 14px", marginBottom:10, textAlign:"center" }}>
                  <div style={{ fontSize:13, fontWeight:800, color:"#FBBF24", marginBottom:3 }}>
                    ⚡ Hết câu hỏi chính — còn {active.length} {unitLabel} trên sàn!
                  </div>
                  <div style={{ fontSize:11.5, color:"rgba(255,255,255,.45)" }}>
                    {isMainExhausted && bonusRound > 0 ? `Đã sinh ${bonusRound} câu phụ.` : "Sinh câu hỏi phụ để phân loại tiếp."}
                  </div>
                </div>
                {bonusError && (
                  bonusError === "__auth__"
                    ? <div style={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:8, padding:"10px 12px", fontSize:12.5, marginBottom:8 }}>
                        <span style={{fontWeight:800,color:"#DC2626"}}>🔑 Chưa có API Key.</span>
                        <span style={{color:"#7F1D1D"}}> Thoát thi → Cài đặt → ⚙️ Ứng dụng → nhập Anthropic API Key.</span>
                      </div>
                    : <div style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)", borderRadius:8, padding:"8px 12px", fontSize:12.5, color:"#FCA5A5", marginBottom:8 }}>
                        ⚠️ {bonusError}
                      </div>
                )}
                <div style={{ display:"flex", gap:9 }}>
                  <button className="btn gcb" style={{ flex:1, fontSize:14, fontWeight:800,
                    background:`linear-gradient(135deg,${getBonusDifficulty(bonusRound+1, active.length)==="Rất khó"?"#7F1D1D,#991B1B":getBonusDifficulty(bonusRound+1, active.length)==="Khó"?"#7C3AED,#5B21B6":"#7C3AED,#5B21B6"})`,
                    color:"#fff",
                    opacity: bonusLoading ? .7 : 1 }}
                    onClick={generateBonus} disabled={bonusLoading}>
                    {bonusLoading
                      ? <><span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⏳</span> AI đang soạn câu hỏi...</>
                      : <>✨ Câu phụ #{bonusRound+1} · {getBonusDifficulty(bonusRound+1, active.length)}</>}
                  </button>
                  <button className="btn gcb" style={{ background:"rgba(239,68,68,.2)", border:"1px solid rgba(239,68,68,.35)", color:"#FCA5A5", fontSize:13 }}
                    onClick={() => { setWinner(active.map(p=>p.name).join(" & ")||null); setPhase("result"); }}>
                    Kết thúc
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="gsd">
          {/* Timer section */}
          <div className="gtimer-zone">
            <Timer
              key={`${timerSeed}-${qIdx}`}
              seconds={timePerQ}
              total={timePerQ}
              running={timerRunning && !revealed}
              onEnd={handleTimerEnd}
              soundOn={soundOn}
            />
            <div className="tctrl">
              <button className={`tbtn ${timerRunning && !revealed ? "run" : ""}`}
                onClick={() => setTimerRunning(r => !r)}
                disabled={revealed}>
                {timerRunning && !revealed ? <><Ic.Pause /> Tạm dừng</> : <><Ic.Play /> Tiếp tục</>}
              </button>
              <button className="tbtn" onClick={resetTimer} disabled={revealed}>
                <Ic.Refresh /> Reset
              </button>
            </div>
            {timeExpired && !revealed && (
              <div style={{ background:"rgba(239,68,68,.2)", border:"1px solid rgba(239,68,68,.4)", borderRadius:8, padding:"7px 10px", fontSize:12, color:"#FCA5A5", textAlign:"center", fontWeight:700 }}>
                ⏰ Hết giờ! Nhấn <strong>"Hiện đáp án"</strong> để tiếp tục.
              </div>
            )}
          </div>

          {/* Student section */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="gsd-title">{isTeamMode ? "Các lớp thi" : "Học sinh"} ({active.length}/{players.length})</div>
              {revealed && !confirmed && (
                <button className="sim-btn" style={{ width: "auto", padding: "4px 10px", fontSize: 11 }}
                  onClick={simulateRandom} disabled={active.length <= 1}>
                  🎲 Ngẫu nhiên
                </button>
              )}
            </div>

            {revealed && !confirmed && selE.length === 0 && (
              <div style={{ background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.22)", borderRadius: 8, padding: "7px 10px", fontSize: 12, color: "rgba(251,191,36,.8)", lineHeight: 1.5 }}>
                👆 Nhấn vào {isTeamMode ? "tên lớp" : "tên HS"} trả lời <strong>SAI</strong> để đánh dấu đỏ, hoặc nhấn <strong>Ngẫu nhiên</strong> để mô phỏng.
              </div>
            )}

            {confirmed && (
              <div className="conf-ok">
                ✓ Đã xác nhận câu {qIdx + 1}{selE.length > 0 ? ` – loại ${selE.length} ${unitLabel}` : ` – tất cả đúng`}
              </div>
            )}

            <div className="gsd-scroll">
              {players.map(p => (
                <div key={p.id}
                  className={`${isTeamMode ? "tc" : "pc"} ${p.s === "out" ? "out" : selE.includes(p.id) ? "se" : "ok"}`}
                  onClick={() => toggleElim(p.id)}>
                  {isTeamMode ? (
                    <>
                      <span className="tc-ico">{p.s === "out" ? "❌" : selE.includes(p.id) ? "🔴" : "🏫"}</span>
                      <span className="tc-label">{p.name}</span>
                      {p.s !== "out" && <span className="tc-badge">{selE.includes(p.id) ? "Sai" : "✓"}</span>}
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: 11, flexShrink: 0 }}>
                        {p.s === "out" ? "❌" : selE.includes(p.id) ? "🔴" : "✅"}
                      </span>
                      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 12 }}>{p.name}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Game log */}
          {log.length > 0 && (
            <div className="glog">
              <div className="glog-title">Diễn biến</div>
              <div className="glog-scroll">
                {[...log].reverse().map((l, i) => <div key={i} className="glog-item">{l}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────── QUESTION MODAL ────────────
function QModal({ q, onSave, onClose }) {
  const blank = { content: "", a: "", b: "", c: "", d: "", correct: "a", subject: "KHTN", grade: "6", lesson: "", week: "1", difficulty: "Dễ", note: "" };
  const [f, setF] = useState(q ? { ...q } : blank);
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const valid = f.content && f.a && f.b && f.c && f.d;
  const oc = { a: "#3B82F6", b: "#10B981", c: "#F59E0B", d: "#EF4444" };
  return (
    <div className="ov">
      <div className="modal">
        <div className="mhd">
          <h2 style={{ fontSize: 17, fontWeight: 800, color: "#1E3A5F" }}>{q ? "✏️ Sửa câu hỏi" : "➕ Thêm câu hỏi mới"}</h2>
          <button onClick={onClose} className="btn btn-g btn-ic"><Ic.X /></button>
        </div>
        <div className="mbd">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 11, marginBottom: 13 }}>
            {[["Môn học", "subject", SUBJECTS], ["Khối lớp", "grade", GRADES], ["Độ khó", "difficulty", DIFFICULTIES]].map(([lbl, key, opts]) => (
              <div key={key}>
                <label className="label">{lbl}</label>
                <select className="inp" value={f[key]} onChange={e => set(key, e.target.value)}>
                  {opts.map(o => <option key={o}>{key === "grade" ? `Lớp ${o}` : o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 11, marginBottom: 13 }}>
            <div>
              <label className="label">Bài học / Chủ đề</label>
              {getLessons(f.subject, f.grade).length > 0 ? (
                <select className="inp" value={f.lesson} onChange={e => set("lesson", e.target.value)}>
                  <option value="">-- Chọn bài học --</option>
                  {getLessons(f.subject, f.grade).map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              ) : (
                <input className="inp" value={f.lesson} onChange={e => set("lesson", e.target.value)} placeholder="VD: Bài 5 – Quang hợp ở thực vật" />
              )}
            </div>
            <div>
              <label className="label">Tuần học</label>
              <input className="inp" type="number" value={f.week} onChange={e => set("week", e.target.value)} min="1" max="35" />
            </div>
          </div>
          <div style={{ marginBottom: 13 }}>
            <label className="label">Nội dung câu hỏi <span className="req">*</span></label>
            <textarea className="inp" rows={3} value={f.content} onChange={e => set("content", e.target.value)} placeholder="Nhập câu hỏi..." style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 13 }}>
            {["a", "b", "c", "d"].map(opt => (
              <div key={opt} style={{ border: `1.5px solid ${f.correct === opt ? oc[opt] : "#E2E8F0"}`, borderRadius: 10, padding: "10px 12px", background: f.correct === opt ? `${oc[opt]}11` : "#fff" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, cursor: "pointer" }}>
                  <input type="radio" name="correct" checked={f.correct === opt} onChange={() => set("correct", opt)} style={{ accentColor: oc[opt] }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: f.correct === opt ? oc[opt] : "#64748B" }}>Đáp án {opt.toUpperCase()} {f.correct === opt && "✓ Đúng"}</span>
                </label>
                <input className="inp" value={f[opt]} onChange={e => set(opt, e.target.value)} placeholder={`Đáp án ${opt.toUpperCase()}...`} style={{ border: "1px solid #E9EEF5", borderRadius: 7, padding: "7px 10px", fontSize: 13 }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="label">Ghi chú cho giáo viên</label>
            <input className="inp" value={f.note} onChange={e => set("note", e.target.value)} placeholder="VD: Học sinh hay nhầm đáp án A và C..." />
          </div>
          <div style={{ display: "flex", gap: 9, justifyContent: "flex-end" }}>
            <button className="btn btn-g" onClick={onClose}>Hủy</button>
            <button className="btn btn-p" disabled={!valid} onClick={() => valid && onSave(f)}><Ic.Chk />Lưu câu hỏi</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────── HISTORY DETAIL MODAL ────────────
function HistoryDetail({ h, onClose }) {
  return (
    <div className="ov">
      <div className="hist-detail">
        <div className="mhd">
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: "#1E3A5F", marginBottom: 4 }}>📊 Chi tiết cuộc thi</h2>
            <div style={{ fontSize: 13, color: "#94A3B8" }}>{h.name}</div>
          </div>
          <button onClick={onClose} className="btn btn-g btn-ic"><Ic.X /></button>
        </div>
        <div className="mbd">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 11, marginBottom: 20 }}>
            {[{ l: "Người chiến thắng", v: h.winner, ico: "🥇", c: "#D97706", bg: "#FEF3C7" },
              { l: "Học sinh tham gia", v: h.players, ico: "👥", c: "#1D4ED8", bg: "#DBEAFE" },
              { l: "Câu đã thi", v: h.questionsPlayed, ico: "❓", c: "#7C3AED", bg: "#EDE9FE" },
            ].map(s => (
              <div key={s.l} style={{ background: s.bg, borderRadius: 12, padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{s.ico}</div>
                <div style={{ fontWeight: 900, fontSize: 16, color: s.c, marginBottom: 2 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#F8FAFC", borderRadius: 12, padding: "16px 18px" }}>
            {[
              ["Tên cuộc thi", h.name],
              ["Môn học", (h.subjects||[h.subject]).join(" · ")],
              ["Khối lớp", `Lớp ${h.grade}`],
              ["Ngày tổ chức", h.createdAt],
              ["Số HS bị loại", `${h.eliminated ?? h.players - 1} / ${h.players} học sinh`],
              ["Kết quả", h.status],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F0F4F8", fontSize: 13 }}>
                <span style={{ color: "#94A3B8", fontWeight: 500 }}>{k}</span>
                <span style={{ fontWeight: 700, color: "#1E293B" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────── BADGES ────────────
const SBadge = ({ s }) => { const m = SMETA[s] || {}; return <span className="badge" style={{ background: m.bg, color: m.dark }}>{m.emoji} {s}</span>; };
const DBadge = ({ d }) => { const c = d === "Dễ" ? "bgr" : d === "Trung bình" ? "bgo" : "bred"; return <span className={`badge ${c}`}>{d}</span>; };
const GBadge = ({ g }) => <span className="badge bb">Lớp {g}</span>;

// ─────────── DASHBOARD ────────────
function Dashboard({ questions, contests, history, navigate, schoolInfo, setSchoolInfo }) {
  const stats = [
    { l: "Câu hỏi trong ngân hàng", v: questions.length, ico: "📚", bg: "#EEF2FF", c: "#3730A3" },
    { l: "Cuộc thi sẵn sàng", v: contests.filter(c => c.status === "ready").length, ico: "🏆", bg: "#FEF3C7", c: "#B45309" },
    { l: "Cuộc thi đã tổ chức", v: history.length, ico: "✅", bg: "#D1FAE5", c: "#065F46" },
    { l: "Học sinh đã tham gia", v: history.reduce((a, h) => a + h.players, 0), ico: "👥", bg: "#EDE9FE", c: "#5B21B6" },
  ];
  return (
    <div className="page-in" style={{ maxWidth: 1060 }}>
      <div style={{ marginBottom: 22, display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
        <input
          style={{ fontSize:13.5, fontWeight:600, color:"#64748B", background:"transparent", border:"none", borderBottom:"1.5px dashed #CBD5E1", outline:"none", cursor:"text", fontFamily:"inherit", minWidth:80, maxWidth:300, padding:"1px 4px" }}
          value={schoolInfo?.schoolName || ""}
          onChange={e => setSchoolInfo && setSchoolInfo(p => ({...p, schoolName: e.target.value}))}
          title="Nhấn để chỉnh tên trường"
        />
        <span style={{ color:"#CBD5E1" }}>–</span>
        <span style={{ color:"#94A3B8", fontSize:13.5 }}>Năm học</span>
        <select style={{ fontSize:13.5, fontWeight:600, color:"#64748B", background:"transparent", border:"none", outline:"none", cursor:"pointer", fontFamily:"inherit" }}
          value={schoolInfo?.schoolYear || "2024–2025"}
          onChange={e => setSchoolInfo && setSchoolInfo(p => ({...p, schoolYear: e.target.value}))}>
          {["2022–2023","2023–2024","2024–2025","2025–2026","2026–2027"].map(y=><option key={y}>{y}</option>)}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 13, marginBottom: 20 }}>
        {stats.map(s => (
          <div className="sc" key={s.l}>
            <div className="sc-ico" style={{ background: s.bg }}>{s.ico}</div>
            <div className="sc-val" style={{ color: s.c }}>{s.v}</div>
            <div className="sc-lbl">{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div className="sec-title">⚡ Thao tác nhanh</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[{ l: "Tạo cuộc thi mới", p: "create", ico: "🏆", cls: "btn-p" }, { l: "Vào Rung Chuông Vàng", p: "game", ico: "🔔", cls: "btn-d" }, { l: "Thêm câu hỏi", p: "questions", ico: "➕", cls: "btn-g" }, { l: "Xem lịch sử", p: "history", ico: "📅", cls: "btn-g" }].map(a => (
              <button key={a.l} className={`btn ${a.cls}`} onClick={() => navigate(a.p)} style={{ justifyContent: "flex-start" }}><span>{a.ico}</span>{a.l}</button>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div className="sec-title">📊 Câu hỏi theo môn học</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {SUBJECTS.map(s => {
              const cnt = questions.filter(q => q.subject === s).length;
              const pct = Math.round(cnt / Math.max(questions.length, 1) * 100);
              const m = SMETA[s] || {};
              return (
                <div key={s}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{m.emoji} {s}</span>
                    <span style={{ fontSize: 12.5, color: "#94A3B8", fontWeight: 600 }}>{cnt} câu</span>
                  </div>
                  <div className="pt"><div className="pf" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${m.color}88,${m.color})` }} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 13 }}>
          <div className="sec-title" style={{ marginBottom: 0 }}>🏅 Cuộc thi sẵn sàng tổ chức</div>
          <button className="btn btn-g btn-sm" onClick={() => navigate("game")}>Xem tất cả</button>
        </div>
        {contests.length === 0 ? (<div className="empty"><div className="empty-ico">🎯</div><div className="empty-txt">Chưa có cuộc thi nào.</div></div>) : (
          <table className="tbl">
            <thead><tr><th>Tên cuộc thi</th><th>Môn</th><th>Lớp</th><th>Số câu</th><th>Số HS</th><th>Ngày tạo</th><th></th></tr></thead>
            <tbody>{contests.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600, color: "#1E293B" }}>{c.name}</td>
                <td><SBadge s={primarySubject(c)} /></td>
                <td><GBadge g={(c.grades||[c.grade]).join(',')} /></td>
                <td>{c.questionIds.length} câu</td>
                <td>{c.totalPlayers} HS</td>
                <td style={{ color: "#94A3B8", fontSize: 13 }}>{c.createdAt}</td>
                <td><button className="btn btn-p btn-sm" onClick={() => navigate("game")}><Ic.Play />Bắt đầu</button></td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─────────── RCV PAGE ────────────
function RCVPage({ contests, questions, navigate, onStartGame, setContests }) {
  const [confirmDel, setConfirmDel] = useState(null);
  return (
    <div className="page-in" style={{ maxWidth: 860 }}>
      {confirmDel !== null && (
        <ConfirmDialog title="Xóa cuộc thi?" message="Cuộc thi này sẽ bị xóa vĩnh viễn. Câu hỏi trong ngân hàng không bị ảnh hưởng."
          onOk={() => { setContests(p => p.filter(c => c.id !== confirmDel)); setConfirmDel(null); }}
          onCancel={() => setConfirmDel(null)} />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <h1 style={{ fontSize: 21, fontWeight: 900, color: "#1E293B", marginBottom: 3 }}>🔔 Rung Chuông Vàng</h1>
          <p style={{ color: "#94A3B8", fontSize: 13.5 }}>{contests.length} cuộc thi đang sẵn sàng tổ chức</p>
        </div>
        <button className="btn btn-p" onClick={() => navigate("create")}><Ic.Plus />Tạo cuộc thi mới</button>
      </div>
      {contests.length === 0 ? (
        <div className="card"><div className="empty"><div className="empty-ico">🎯</div><div className="empty-txt" style={{ marginBottom: 16 }}>Chưa có cuộc thi nào.<br />Hãy tạo cuộc thi đầu tiên!</div><button className="btn btn-p" onClick={() => navigate("create")}><Ic.Plus />Tạo cuộc thi ngay</button></div></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {contests.map(c => {
            const qs = questions.filter(q => c.questionIds.includes(q.id));
            const subs = c.subjects || [c.subject];
            const grs  = c.grades   || [c.grade];
            const m = SMETA[subs[0]] || {};
            return (
              <div key={c.id} className="cc">
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 50, height: 50, background: subs.length > 1 ? "linear-gradient(135deg,#FEF3C7,#EDE9FE)" : m.bg, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, flexDirection:"column", gap:1 }}>
                    {subs.length === 1
                      ? <span style={{fontSize:22}}>{m.emoji}</span>
                      : subs.slice(0,3).map(s=><span key={s} style={{fontSize:13,lineHeight:1}}>{SMETA[s]?.emoji||'📚'}</span>)
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: 15.5, fontWeight: 800, color: "#1E293B" }}>{c.name}</h3>
                      <span className="badge bgr">✓ Sẵn sàng</span>
                      {subs.length > 1 && <span className="badge bpu">🎯 {subs.length} môn</span>}
                      {c.mode === "team" && <span className="badge borange">🏫 Thi theo lớp</span>}
                      {c.useRounds && <span className="badge" style={{background:"#DBEAFE",color:"#1D4ED8"}}>🎯 4 vòng thi</span>}
                    </div>
                    <div className="ir" style={{ marginBottom: 10 }}>
                      {subs.map(s => <SBadge key={s} s={s} />)}
                      {grs.map(g => <GBadge key={g} g={g} />)}
                      <div className="ii2">📝 <strong>{qs.length}</strong> câu</div>
                      <div className="ii2">⏱ <strong>{c.timePerQuestion}s</strong>/câu</div>
                      <div className="ii2">👥 <strong>{c.totalPlayers}</strong> HS</div>
                      <div className="ii2" style={{ color: "#CBD5E1" }}>📅 {c.createdAt}</div>
                    </div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {qs.slice(0, 3).map(q => (
                        <div key={q.id} style={{ background: "#F8FAFC", border: "1px solid #E9EEF5", borderRadius: 7, padding: "4px 9px", fontSize: 12, color: "#64748B", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          <span style={{color:SMETA[q.subject]?.color||'#94A3B8',fontWeight:700,marginRight:3}}>{SMETA[q.subject]?.emoji}</span>{q.content}
                        </div>
                      ))}
                      {qs.length > 3 && <div style={{ background: "#F8FAFC", border: "1px solid #E9EEF5", borderRadius: 7, padding: "4px 9px", fontSize: 12, color: "#94A3B8" }}>+{qs.length - 3} câu nữa</div>}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, display:"flex", flexDirection:"column", gap:7 }}>
                    <button className="btn btn-p" onClick={() => onStartGame(c)} style={{ padding: "11px 20px", fontSize: 14 }}><Ic.Play />Bắt đầu thi</button>
                    <button className="btn btn-r btn-sm" onClick={() => setConfirmDel(c.id)} style={{ justifyContent:"center" }}><Ic.Trash />Xóa</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────── AI GENERATE MODAL ────────────
// ─────────── TỈNH THÀNH SAU SÁP NHẬP 1/7/2025 ────────────
// Nguồn: Nghị quyết Quốc hội ngày 12/6/2025 – 63 → 34 tỉnh/thành
const MERGED_PROVINCES = [
  // ── 11 TỈNH/THÀNH KHÔNG SÁP NHẬP ──
  { id:"hanoi",     name:"Hà Nội",        emoji:"🏛️", merged:["Hà Nội"],                         note:"Thủ đô – không sáp nhập" },
  { id:"hue",       name:"Huế",           emoji:"🏰", merged:["Thừa Thiên Huế"],                  note:"Thành phố Huế – đổi tên từ tỉnh Thừa Thiên Huế" },
  { id:"caobang",   name:"Cao Bằng",      emoji:"⛰️", merged:["Cao Bằng"],                        note:"Không sáp nhập" },
  { id:"dienbien",  name:"Điện Biên",     emoji:"🎖️", merged:["Điện Biên"],                       note:"Không sáp nhập" },
  { id:"hatinh",    name:"Hà Tĩnh",       emoji:"🌊", merged:["Hà Tĩnh"],                         note:"Không sáp nhập" },
  { id:"laichau",   name:"Lai Châu",      emoji:"🏔️", merged:["Lai Châu"],                        note:"Không sáp nhập" },
  { id:"langson",   name:"Lạng Sơn",      emoji:"🌄", merged:["Lạng Sơn"],                        note:"Không sáp nhập" },
  { id:"nghean",    name:"Nghệ An",       emoji:"⛰️", merged:["Nghệ An"],                         note:"Không sáp nhập – tỉnh lớn nhất cả nước" },
  { id:"quangninh", name:"Quảng Ninh",    emoji:"⛵", merged:["Quảng Ninh"],                       note:"Không sáp nhập – Di sản Vịnh Hạ Long" },
  { id:"sonla",     name:"Sơn La",        emoji:"🌲", merged:["Sơn La"],                           note:"Không sáp nhập" },
  { id:"thanhhoa",  name:"Thanh Hóa",     emoji:"🏯", merged:["Thanh Hóa"],                       note:"Không sáp nhập" },

  // ── 23 TỈNH/THÀNH MỚI SAU SÁP NHẬP ──
  { id:"tuyenquang",name:"Tuyên Quang",   emoji:"🎋", merged:["Hà Giang","Tuyên Quang"],           note:"Cổng trời Đông Bắc – hợp nhất Hà Giang và Tuyên Quang" },
  { id:"laocai",    name:"Lào Cai",       emoji:"🏔️", merged:["Yên Bái","Lào Cai"],               note:"Cửa ngõ Tây Bắc – hợp nhất Yên Bái và Lào Cai" },
  { id:"thainguyen",name:"Thái Nguyên",   emoji:"🍵", merged:["Bắc Kạn","Thái Nguyên"],           note:"Thủ phủ chè – hợp nhất Bắc Kạn và Thái Nguyên" },
  { id:"phutho",    name:"Phú Thọ",       emoji:"🎋", merged:["Vĩnh Phúc","Hòa Bình","Phú Thọ"], note:"Đất Tổ Hùng Vương – hợp nhất Vĩnh Phúc, Hòa Bình, Phú Thọ" },
  { id:"bacninh",   name:"Bắc Ninh",      emoji:"🏭", merged:["Bắc Giang","Bắc Ninh"],            note:"Trung tâm công nghiệp phía Bắc – hợp nhất Bắc Giang và Bắc Ninh" },
  { id:"hungyen",   name:"Hưng Yên",      emoji:"🌸", merged:["Hải Dương","Hưng Yên"],            note:"Đồng bằng Bắc Bộ – hợp nhất Hải Dương và Hưng Yên" },
  { id:"haiphong",  name:"TP Hải Phòng",  emoji:"⚓", merged:["Hà Nam","Hải Phòng"],              note:"Cực tăng trưởng kinh tế biển phía Bắc" },
  { id:"ninhbinh",  name:"Ninh Bình",     emoji:"⛵", merged:["Nam Định","Thái Bình","Ninh Bình"], note:"Hợp nhất Nam Định, Thái Bình và Ninh Bình" },
  { id:"quangtri",  name:"Quảng Trị",     emoji:"🕊️", merged:["Quảng Bình","Quảng Trị"],          note:"Hợp nhất Quảng Bình và Quảng Trị" },
  { id:"danang",    name:"TP Đà Nẵng",    emoji:"🌊", merged:["Quảng Nam","Đà Nẵng"],             note:"Trung tâm kinh tế miền Trung – hợp nhất Quảng Nam và Đà Nẵng" },
  { id:"quangngai", name:"Quảng Ngãi",    emoji:"🌅", merged:["Kon Tum","Quảng Ngãi"],            note:"Hợp nhất Kon Tum và Quảng Ngãi" },
  { id:"gialai",    name:"Gia Lai",       emoji:"🌿", merged:["Bình Định","Gia Lai"],             note:"Tây Nguyên – hợp nhất Bình Định và Gia Lai" },
  { id:"khanhhoa",  name:"Khánh Hòa",     emoji:"🏖️", merged:["Ninh Thuận","Khánh Hòa"],         note:"Hợp nhất Ninh Thuận và Khánh Hòa" },
  { id:"lamdong",   name:"Lâm Đồng",      emoji:"🌸", merged:["Đắk Nông","Bình Thuận","Lâm Đồng"],note:"Đà Lạt – hợp nhất Đắk Nông, Bình Thuận và Lâm Đồng" },
  { id:"daklak",    name:"Đắk Lắk",       emoji:"🐘", merged:["Phú Yên","Đắk Lắk"],              note:"Thủ phủ Tây Nguyên – hợp nhất Phú Yên và Đắk Lắk" },
  { id:"hcm",       name:"TP Hồ Chí Minh",emoji:"🌆", merged:["Bà Rịa–Vũng Tàu","Bình Dương","TP Hồ Chí Minh"], note:"Hợp nhất BR-VT, Bình Dương và TP HCM" },
  { id:"dongnai",   name:"Đồng Nai",      emoji:"🏗️", merged:["Bình Phước","Đồng Nai"],          note:"Hợp nhất Bình Phước và Đồng Nai" },
  { id:"tayninh",   name:"Tây Ninh",      emoji:"🌳", merged:["Long An","Tây Ninh"],              note:"Hợp nhất Long An và Tây Ninh" },
  { id:"cantho",    name:"TP Cần Thơ",    emoji:"🌾", merged:["Sóc Trăng","Hậu Giang","Cần Thơ"], note:"Trung tâm ĐBSCL – hợp nhất Sóc Trăng, Hậu Giang và Cần Thơ" },
  { id:"vinhlong",  name:"Vĩnh Long",     emoji:"🌸", merged:["Bến Tre","Trà Vinh","Vĩnh Long"],  note:"Hợp nhất Bến Tre, Trà Vinh và Vĩnh Long" },
  { id:"dongthap",  name:"Đồng Tháp",     emoji:"🌺", merged:["Tiền Giang","Đồng Tháp"],         note:"Đất Sen hồng – hợp nhất Tiền Giang và Đồng Tháp" },
  { id:"camau",     name:"Cà Mau",        emoji:"🦀", merged:["Bạc Liêu","Cà Mau"],              note:"Cực Nam Tổ quốc – hợp nhất Bạc Liêu và Cà Mau" },
  { id:"angiang",   name:"An Giang",      emoji:"⛩️", merged:["Kiên Giang","An Giang"],           note:"Hợp nhất Kiên Giang và An Giang – gồm đảo Phú Quốc" },
];

function AIGenerateModal({ onAdd, onClose, nextId, contests = [], setContests, lockSubjects = [], lockGrades = [], navigate }) {
  const isLocked = lockSubjects.length > 0 || lockGrades.length > 0;
  const availableSubjects = isLocked ? lockSubjects : SUBJECTS;
  const availableGrades   = isLocked ? lockGrades   : GRADES;

  const [mode, setMode]       = useState("curriculum");
  const [localBlend, setLocalBlend] = useState(false);
  const [quickMode, setQuickMode] = useState(false); // new quick generate tab
  // Quick mode state
  const [qmGrade, setQmGrade]       = useState(lockGrades[0] || "6");
  const [qmSubjects, setQmSubjects] = useState(lockSubjects.length > 0 ? lockSubjects : ["KHTN","Toán"]);
  const [qmTotal, setQmTotal]       = useState(10);
  const [qmLoading, setQmLoading]   = useState(false);
  const [qmError, setQmError]       = useState("");
  const [qmPlan, setQmPlan]         = useState(null); // AI-calculated plan
  const [subject, setSubject] = useState(lockSubjects[0] || "KHTN");
  const [grade, setGrade]     = useState(lockGrades[0]   || "6");
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [count, setCount]     = useState(5);
  const [difficulty, setDiff] = useState("Trung bình");
  // Local education
  const [province, setProvince] = useState(() => MERGED_PROVINCES.find(p=>p.id==="tayninh") || MERGED_PROVINCES[0]);
  const [localTopic, setLocalTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [error, setError]     = useState("");
  const [added, setAdded]     = useState(false);
  const [addedIds, setAddedIds] = useState([]); // IDs of questions just added
  const [assignContest, setAssignContest] = useState(""); // contest id to assign to

  const lessons = getLessons(subject, grade);

  const LOCAL_TOPICS = [
    "Lịch sử địa phương","Địa lí tự nhiên địa phương","Danh lam thắng cảnh",
    "Di tích lịch sử","Phong tục tập quán","Sản vật – đặc sản địa phương",
    "Kinh tế địa phương","Nhân vật lịch sử địa phương","Văn học dân gian địa phương",
    "Bảo vệ môi trường địa phương","Nghề truyền thống","Câu hỏi tổng hợp địa phương",
  ];

  // ── Quick generate ──
  const quickGenerate = async () => {
    if (qmSubjects.length === 0) { setQmError("Chọn ít nhất 1 môn học."); return; }
    setQmLoading(true); setQmError(""); setQmPlan(null); setResults([]); setSelected([]);
    const perSubject = Math.max(1, Math.floor(qmTotal / qmSubjects.length));
    const remainder  = qmTotal - perSubject * qmSubjects.length;
    // Difficulty split: ~40% dễ, ~40% trung bình, ~20% khó
    const diffs = { dễ: Math.ceil(qmTotal*.4), "trung bình": Math.ceil(qmTotal*.4), khó: Math.floor(qmTotal*.2) };
    const subjectList = qmSubjects.map((s,i) => `${s}: ${perSubject + (i===0?remainder:0)} câu`).join(", ");

    const prompt = `Bạn là giáo viên THCS Việt Nam. Hãy tạo bộ đề trắc nghiệm tổng hợp gồm ${qmTotal} câu cho lớp ${qmGrade}.
Môn học và phân bổ: ${subjectList}.
Phân bổ độ khó tự động: khoảng 40% Dễ, 40% Trung bình, 20% Khó.
Câu hỏi bám sát chương trình Kết nối tri thức với cuộc sống. Mỗi câu ngắn gọn, rõ ràng, 4 đáp án A/B/C/D.

Trả về JSON hợp lệ duy nhất (KHÔNG markdown, KHÔNG backtick):
[{"content":"?","a":"","b":"","c":"","d":"","correct":"a","subject":"Tên môn","difficulty":"Dễ|Trung bình|Khó","lesson":"Tên bài","note":""}]
Phải đủ ${qmTotal} câu, phân bổ đúng theo môn.`;
    try {
      const raw = await callAI({ prompt, maxTokens: 4000 });
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      const withIds = parsed.map((q,i) => ({...q, _id:`qm_${i}`, grade: qmGrade}));
      setResults(withIds);
      setSelected(withIds.map(q=>q._id));
      // Compute plan summary
      const planBySubject = {};
      const planByDiff    = {Dễ:0, "Trung bình":0, Khó:0};
      withIds.forEach(q => {
        planBySubject[q.subject] = (planBySubject[q.subject]||0)+1;
        if (q.difficulty in planByDiff) planByDiff[q.difficulty]++;
      });
      setQmPlan({ bySubject: planBySubject, byDiff: planByDiff, total: withIds.length });
    } catch(e) {
      const msg2 = e?.message || "";
      setQmError(msg2.includes("401")||msg2.includes("xác thực")||msg2.includes("API Key") ? "__auth__" : "Không tạo được bộ đề. Kiểm tra kết nối mạng và thử lại.");
    }
    setQmLoading(false);
  };

  const generate = async () => {
    const isLocal = mode === "local";
    const isBlended = mode === "curriculum" && localBlend;
    if (!isLocal && selectedLessons.length === 0) { setError("Vui lòng chọn ít nhất 1 bài học."); return; }
    if (isLocal && !localTopic) { setError("Vui lòng chọn chủ đề địa phương."); return; }
    if (isBlended && !localTopic) { setError("Vui lòng chọn chủ đề địa phương để tích hợp."); return; }
    setLoading(true); setError(""); setResults([]); setSelected([]);
    const lessonLabel = selectedLessons.length === 1 ? selectedLessons[0] : `${selectedLessons.length} bài: ${selectedLessons.join(", ")}`;

    const prompt = isLocal
      ? `Bạn là giáo viên THCS Việt Nam dạy môn Giáo dục địa phương lớp ${grade}.
Hãy tạo ${count} câu hỏi trắc nghiệm 4 đáp án (A/B/C/D) về chủ đề: "${localTopic}" của tỉnh/thành phố: ${province.name} (${province.merged.join(", ")}).
Thông tin: ${province.note}.
Độ khó: ${difficulty}. Câu hỏi phải có nội dung CỤ THỂ về địa phương đó (tên địa danh, nhân vật, sự kiện thực tế).

Trả về JSON hợp lệ (KHÔNG có markdown, KHÔNG có backtick):
[{"content":"Câu hỏi?","a":"...","b":"...","c":"...","d":"...","correct":"a","note":""}]`
      : isBlended
      ? `Bạn là giáo viên THCS Việt Nam dạy môn ${subject} lớp ${grade}, chương trình Kết nối tri thức với cuộc sống.
Hãy tạo ${count} câu hỏi trắc nghiệm 4 đáp án (A/B/C/D) cho ${lessonLabel}.
${selectedLessons.length > 1 ? `Phân bổ đều cho các bài (khoảng ${Math.ceil(count/selectedLessons.length)} câu/bài).` : ""}
Độ khó: ${difficulty}.

YÊU CẦU ĐẶC BIỆT – TÍCH HỢP ĐỊA PHƯƠNG:
Ít nhất 50% câu hỏi phải gắn kiến thức môn học với thực tiễn địa phương: ${province.name} (${province.merged.join(", ")}).
Ví dụ: liên hệ bài học với địa danh, sản vật, lịch sử, con người, sự kiện thực tế của ${province.name}.
Các câu còn lại theo đúng kiến thức sách giáo khoa.

Trả về JSON hợp lệ (KHÔNG có markdown, KHÔNG có backtick):
[{"content":"Câu hỏi?","a":"...","b":"...","c":"...","d":"...","correct":"a","note":"","lesson":"tên bài tương ứng"}]`
      : `Bạn là giáo viên THCS Việt Nam dạy môn ${subject} lớp ${grade}, chương trình Kết nối tri thức với cuộc sống.
Hãy tạo ${count} câu hỏi trắc nghiệm 4 đáp án (A/B/C/D) cho ${lessonLabel}.
${selectedLessons.length > 1 ? `Phân bổ đều câu hỏi cho các bài (khoảng ${Math.ceil(count/selectedLessons.length)} câu/bài).` : ""}
Độ khó: ${difficulty}. Đáp án đúng PHẢI chính xác theo kiến thức sách giáo khoa.

Trả về JSON hợp lệ (KHÔNG có markdown, KHÔNG có backtick):
[{"content":"Câu hỏi?","a":"...","b":"...","c":"...","d":"...","correct":"a","note":"","lesson":"tên bài tương ứng"}]`;

    try {
      const raw = await callAI({ prompt, maxTokens: 2000 });
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      if (!Array.isArray(parsed)) throw new Error("Kết quả không phải mảng");
      setResults(parsed.map((q, i) => ({ ...q, _id: i })));
      setSelected(parsed.map((_, i) => i));
    } catch(e) {
      const msg3 = e?.message || "";
      setError(msg3.includes("401")||msg3.includes("xác thực")||msg3.includes("API Key") ? "__auth__" : "Không sinh được câu hỏi. Hãy thử lại hoặc kiểm tra kết nối.");
    }
    setLoading(false);
  };

  const doAdd = () => {
    const isLocal = mode === "local";
    const toAdd = results
      .filter(q => selected.includes(q._id))
      .map(({ _id, ...q }, i) => ({
        ...q,
        id: nextId + i,
        subject: isLocal ? "GD địa phương" : subject,
        grade,
        lesson: isLocal ? `${localTopic} – ${province.name}` : (q.lesson || selectedLessons[0] || ""),
        difficulty,
        week: "",
      }));
    const newIds = toAdd.map(q => q.id);
    onAdd(toAdd);
    setAddedIds(newIds);
    setAdded(true);
  };

  const canGenerate = selectedLessons.length > 0 && (!localBlend || !!localTopic);
  const displayLabel = localBlend
    ? `${selectedLessons.length===1?selectedLessons[0]:`${selectedLessons.length} bài`} + ${province.name}`
    : selectedLessons.length === 1 ? selectedLessons[0] : `${selectedLessons.length} bài học`;

  return (
    <div className="ov">
      <div className="ai-modal">
        <div className="mhd">
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: "#1E3A5F", display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:20 }}>✨</span> AI sinh câu hỏi tự động
            </h2>
            <p style={{ fontSize: 12.5, color: "#94A3B8", marginTop: 3 }}>
              Chọn chương trình hoặc tích hợp địa phương → AI tạo câu hỏi trắc nghiệm
            </p>
          </div>
          <button onClick={onClose} className="btn btn-g btn-ic"><Ic.X /></button>
        </div>
        <div className="mbd">

          {added ? (
            <div style={{ textAlign:"center", padding:"24px 0" }}>
              <div style={{ fontSize:48, marginBottom:10 }}>🎉</div>
              <h3 style={{ fontSize:18, fontWeight:900, color:"#1E293B", marginBottom:6 }}>Đã thêm vào ngân hàng!</h3>
              <p style={{ color:"#64748B", fontSize:13.5, marginBottom:20 }}>
                <strong style={{color:"#D97706"}}>{selected.length} câu hỏi</strong> từ <em>{displayLabel}</em> đã được thêm thành công.
              </p>

              {/* ── Gán vào cuộc thi ── */}
              {contests.length > 0 && (
                <div style={{ background:"#F8FAFC", border:"1.5px solid #E2E8F0", borderRadius:12, padding:"16px 18px", marginBottom:18, textAlign:"left" }}>
                  <div style={{ fontWeight:800, color:"#1E293B", fontSize:13.5, marginBottom:8, display:"flex", alignItems:"center", gap:7 }}>
                    <span>🏆</span> Thêm vào cuộc thi ngay?
                  </div>
                  <div style={{ fontSize:12.5, color:"#64748B", marginBottom:10 }}>
                    Chọn cuộc thi để gán {selected.length} câu hỏi vừa tạo vào pool của cuộc thi đó.
                  </div>
                  <select className="inp" value={assignContest}
                    onChange={e => setAssignContest(e.target.value)}
                    style={{ marginBottom:10 }}>
                    <option value="">-- Chọn cuộc thi --</option>
                    {contests.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({(c.questionIds||[]).length} câu hiện tại)
                      </option>
                    ))}
                  </select>
                  {assignContest && (
                    <button className="btn btn-p" style={{ width:"100%", justifyContent:"center" }}
                      onClick={() => {
                        if (!setContests) return;
                        setContests(prev => prev.map(c =>
                          c.id === +assignContest
                            ? { ...c, questionIds: [...new Set([...(c.questionIds||[]), ...addedIds])] }
                            : c
                        ));
                        setAssignContest("");
                      }}>
                      <Ic.Chk /> Gán {selected.length} câu vào "{contests.find(c=>c.id===+assignContest)?.name}"
                    </button>
                  )}
                </div>
              )}

              <div style={{ display:"flex", gap:9, justifyContent:"center" }}>
                <button className="btn btn-g" onClick={() => { setAdded(false); setResults([]); setSelected([]); setAddedIds([]); setQmPlan(null); }}>
                  ✨ Sinh thêm câu hỏi
                </button>
                <button className="btn btn-p" onClick={onClose}>Xong</button>
              </div>
            </div>
          ) : (
            <>
              {/* ── Mode tabs ── */}
              <div style={{ display:"flex", background:"#F1F5F9", borderRadius:11, padding:"3px", gap:3, marginBottom:16 }}>
                <button className={`qb-vtab ${!quickMode?"on":""}`} style={{flex:1}}
                  onClick={() => { setQuickMode(false); setResults([]); setQmPlan(null); }}>
                  📚 Chi tiết theo bài
                </button>
                <button className={`qb-vtab ${quickMode?"on":""}`} style={{flex:1, color:quickMode?"#1E293B":"#64748B"}}
                  onClick={() => { setQuickMode(true); setResults([]); setQmPlan(null); }}>
                  ⚡ Tạo nhanh
                </button>
              </div>

              {/* ══ QUICK GENERATE MODE ══ */}
              {quickMode ? (
                <>
                  {/* Header hint */}
                  <div style={{ background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)", border:"1px solid #BFDBFE", borderRadius:12, padding:"12px 15px", marginBottom:16, display:"flex", gap:10, alignItems:"flex-start" }}>
                    <span style={{fontSize:20}}>⚡</span>
                    <div>
                      <div style={{ fontWeight:800, color:"#1D4ED8", fontSize:13.5, marginBottom:2 }}>Tạo nhanh bộ đề tổng hợp</div>
                      <div style={{ fontSize:12.5, color:"#3B82F6", lineHeight:1.5 }}>
                        Chỉ cần chọn lớp, môn, số câu — AI tự cân đối số câu mỗi môn và phân bổ độ khó Dễ/Trung bình/Khó tự động.
                      </div>
                    </div>
                  </div>

                  {/* Grade */}
                  <div style={{ marginBottom:14 }}>
                    <label className="label">📚 Khối lớp {isLocked && availableGrades.length===1 && <span style={{fontSize:10,color:"#B45309",fontWeight:700}}>🔒</span>}</label>
                    {isLocked && availableGrades.length===1 ? (
                      <div className="inp" style={{background:"#FEF3C7",borderColor:"#FDE68A",color:"#92400E",fontWeight:700}}>Lớp {qmGrade}</div>
                    ) : (
                      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                        {(isLocked ? availableGrades : GRADES).map(g => (
                          <div key={g} className={`rc ${qmGrade===g?"on":""}`}
                            onClick={() => setQmGrade(g)} style={{fontSize:14,padding:"6px 16px"}}>
                            Lớp {g}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Subjects multi-select */}
                  <div style={{ marginBottom:14 }}>
                    <label className="label">
                      🎯 Môn học
                      <span style={{marginLeft:8,fontSize:11,color:"#94A3B8"}}>chọn một hoặc nhiều môn</span>
                    </label>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
                      {(isLocked ? availableSubjects : SUBJECTS).map(s => {
                        const m = SMETA[s]||{};
                        const on = qmSubjects.includes(s);
                        return (
                          <div key={s}
                            onClick={() => setQmSubjects(prev => on ? prev.filter(x=>x!==s) : [...prev,s])}
                            style={{
                              display:"flex",alignItems:"center",gap:7,padding:"8px 10px",
                              borderRadius:9,cursor:"pointer",border:`1.5px solid ${on?m.color+"66":"#E2E8F0"}`,
                              background:on?m.bg:"#FAFBFC",transition:"all .13s",
                            }}>
                            <span style={{fontSize:15}}>{m.emoji}</span>
                            <span style={{fontSize:12.5,fontWeight:on?700:500,color:on?m.dark:"#374151",lineHeight:1.3}}>{s}</span>
                            {on && <Ic.Chk />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Total question count */}
                  <div style={{ marginBottom:16 }}>
                    <label className="label">
                      🔢 Tổng số câu
                      {qmSubjects.length>0 && <span style={{marginLeft:8,fontSize:11,color:"#64748B"}}>
                        → ~{Math.ceil(qmTotal/Math.max(qmSubjects.length,1))} câu/môn
                      </span>}
                    </label>
                    <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:8}}>
                      {[6,8,10,12,15,20,25,30].map(n => (
                        <div key={n} className={`rc ${qmTotal===n?"on":""}`} onClick={() => setQmTotal(n)}>{n}</div>
                      ))}
                    </div>
                    <input className="inp" type="number" value={qmTotal}
                      onChange={e => setQmTotal(Math.max(2,+e.target.value))} min={2} max={60}/>
                  </div>

                  {/* Preview plan */}
                  {qmSubjects.length > 0 && !qmLoading && results.length === 0 && (
                    <div style={{ background:"#F8FAFC", border:"1px solid #E2E8F0", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:"#94A3B8", marginBottom:8, letterSpacing:1, textTransform:"uppercase" }}>Kế hoạch AI sẽ tạo</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
                        {qmSubjects.map((s,i) => {
                          const m = SMETA[s]||{};
                          const cnt = Math.floor(qmTotal/qmSubjects.length)+(i===0?qmTotal%qmSubjects.length:0);
                          return (
                            <span key={s} style={{background:m.bg||"#F1F5F9",color:m.dark||"#374151",border:`1px solid ${m.color||"#E2E8F0"}44`,borderRadius:100,padding:"3px 10px",fontSize:12,fontWeight:700}}>
                              {m.emoji} {s}: {cnt} câu
                            </span>
                          );
                        })}
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        {[["Dễ","#22C55E",40],["Trung bình","#F59E0B",40],["Khó","#EF4444",20]].map(([d,c,pct])=>(
                          <span key={d} style={{background:`${c}15`,color:c,border:`1px solid ${c}44`,borderRadius:100,padding:"3px 10px",fontSize:12,fontWeight:700}}>
                            {d}: ~{Math.round(qmTotal*pct/100)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Result plan */}
                  {qmPlan && results.length > 0 && (
                    <div style={{ background:"#ECFDF5", border:"1.5px solid #A7F3D0", borderRadius:10, padding:"11px 14px", marginBottom:12 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:"#065F46", marginBottom:6 }}>✓ AI đã tạo {qmPlan.total} câu</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:5 }}>
                        {Object.entries(qmPlan.bySubject).map(([s,n])=>(
                          <span key={s} style={{background:"#D1FAE5",color:"#065F46",borderRadius:100,padding:"2px 8px",fontSize:11.5,fontWeight:700}}>
                            {SMETA[s]?.emoji} {s}: {n}
                          </span>
                        ))}
                      </div>
                      <div style={{ display:"flex", gap:6 }}>
                        {Object.entries(qmPlan.byDiff).filter(([,n])=>n>0).map(([d,n])=>(
                          <span key={d} style={{fontSize:11.5,color:"#047857",fontWeight:600}}>
                            {d}: {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {qmError && <div style={{color:"#EF4444",fontSize:12.5,marginBottom:10,fontWeight:600}}>⚠ {qmError}</div>}

                  {results.length === 0 ? (
                    <button className="btn btn-lg" style={{
                      width:"100%", justifyContent:"center", marginBottom:18,
                      background:"linear-gradient(135deg,#2563EB,#1D4ED8)", color:"#fff", border:"none"
                    }} onClick={quickGenerate} disabled={qmLoading || qmSubjects.length===0}>
                      {qmLoading
                        ? <><span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⏳</span> AI đang tạo bộ đề...</>
                        : <>⚡ Tạo {qmTotal} câu tổng hợp — {qmSubjects.length} môn</>}
                    </button>
                  ) : null}
                </>
              ) : (
              <>
              {/* Common top row: subject, grade, count, difficulty */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 80px 120px", gap:10, marginBottom:14 }}>
                <div>
                  <label className="label">Môn học {isLocked && <span style={{fontSize:10,color:"#B45309",fontWeight:700}}>🔒</span>}</label>
                  {availableSubjects.length === 1 ? (
                    <div className="inp" style={{ background:"#FEF3C7", borderColor:"#FDE68A", color:"#92400E", fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
                      <span>{SMETA[subject]?.emoji}</span>{subject}
                    </div>
                  ) : (
                    <select className="inp" value={subject} onChange={e => { setSubject(e.target.value); setSelectedLessons([]); setResults([]); }}>
                      {availableSubjects.map(s => <option key={s}>{s}</option>)}
                    </select>
                  )}
                </div>
                <div>
                  <label className="label">Khối lớp {isLocked && <span style={{fontSize:10,color:"#B45309",fontWeight:700}}>🔒</span>}</label>
                  {availableGrades.length === 1 ? (
                    <div className="inp" style={{ background:"#FEF3C7", borderColor:"#FDE68A", color:"#92400E", fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
                      Lớp {grade}
                    </div>
                  ) : (
                    <select className="inp" value={grade} onChange={e => { setGrade(e.target.value); setSelectedLessons([]); setResults([]); }}>
                      {availableGrades.map(g => <option key={g} value={g}>Lớp {g}</option>)}
                    </select>
                  )}
                </div>
                <div>
                  <label className="label">Số câu</label>
                  <select className="inp" value={count} onChange={e => setCount(+e.target.value)}>
                    {[2,3,4,5,6,7,8,10].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Độ khó</label>
                  <select className="inp" value={difficulty} onChange={e => setDiff(e.target.value)}>
                    {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Lesson multi-select */}
              <div style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                  <label className="label" style={{ marginBottom:0 }}>
                    Bài học <span className="req">*</span>
                    <span style={{ marginLeft:8, fontSize:11, color:"#94A3B8", fontWeight:500 }}>
                      {lessons.length} bài · đã chọn <strong style={{color:"#D97706"}}>{selectedLessons.length}</strong>
                    </span>
                  </label>
                  <div style={{ display:"flex", gap:6 }}>
                    <button className="btn btn-g btn-sm" style={{fontSize:11,padding:"3px 9px"}}
                      onClick={() => setSelectedLessons(lessons)}>Tất cả</button>
                    <button className="btn btn-g btn-sm" style={{fontSize:11,padding:"3px 9px"}}
                      onClick={() => setSelectedLessons([])}>Bỏ chọn</button>
                  </div>
                </div>
                {lessons.length > 0 ? (
                  <div style={{ border:"1.5px solid #E2E8F0", borderRadius:10, maxHeight:200, overflowY:"auto", background:"#FAFBFC" }}>
                    {lessons.map(l => {
                      const checked = selectedLessons.includes(l);
                      return (
                        <label key={l} style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 12px", cursor:"pointer", borderBottom:"1px solid #F1F5F9", background: checked?"#FFFBEB":"transparent", transition:"background .1s" }}>
                          <input type="checkbox" checked={checked}
                            onChange={() => setSelectedLessons(prev => checked ? prev.filter(x=>x!==l) : [...prev, l])}
                            style={{ width:15, height:15, accentColor:"#D97706", cursor:"pointer", flexShrink:0 }} />
                          <span style={{ fontSize:13, color: checked?"#92400E":"#374151", fontWeight: checked?700:400, lineHeight:1.4 }}>{l}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <input className="inp" value={selectedLessons[0]||""} onChange={e => setSelectedLessons(e.target.value ? [e.target.value] : [])}
                    placeholder="Nhập tên bài học..." />
                )}
              </div>

              {/* ── Tích hợp địa phương toggle ── */}
              <div style={{ border:`1.5px solid ${localBlend?"#D97706":"#E2E8F0"}`, borderRadius:12, overflow:"hidden", marginBottom:14, transition:"border-color .2s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px",
                  background: localBlend?"linear-gradient(135deg,#FFFBEB,#FEF3C7)":"#F8FAFC", cursor:"pointer" }}
                  onClick={() => { setLocalBlend(b => !b); setResults([]); }}>
                  <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                    <span style={{ fontSize:18 }}>🏡</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:13.5, color: localBlend?"#92400E":"#374151" }}>
                        Tích hợp yếu tố địa phương
                      </div>
                      <div style={{ fontSize:11.5, color:"#94A3B8", marginTop:1 }}>
                        {localBlend ? `AI sẽ lồng ghép thực tiễn ${province.name} vào câu hỏi SGK` : "Bật để AI lồng ghép kiến thức địa phương vào câu hỏi SGK"}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    {localBlend && <span style={{ fontSize:10.5, background:"#D97706", color:"#fff", borderRadius:100, padding:"2px 8px", fontWeight:700 }}>Đang bật</span>}
                    <span style={{ fontSize:18, color: localBlend?"#D97706":"#CBD5E1", transition:"transform .2s", transform: localBlend?"rotate(180deg)":"none" }}>▾</span>
                  </div>
                </div>

                {localBlend && (
                  <div style={{ padding:"12px 14px", borderTop:"1px solid #FDE68A", background:"#FFFBEB" }}>
                    {/* Province selector */}
                    <div style={{ marginBottom:10 }}>
                      <label className="label" style={{fontSize:11}}>Tỉnh / Thành phố (sau sáp nhập 1/7/2025)</label>
                      <select className="inp" value={province.id}
                        onChange={e => { setProvince(MERGED_PROVINCES.find(p=>p.id===e.target.value)); setResults([]); }}>
                        {MERGED_PROVINCES.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>)}
                      </select>
                    </div>

                    {/* Province info pill */}
                    <div style={{ background:"rgba(30,58,95,.08)", border:"1px solid rgba(30,58,95,.15)", borderRadius:9, padding:"8px 12px", marginBottom:10, display:"flex", gap:10, alignItems:"center" }}>
                      <span style={{ fontSize:22 }}>{province.emoji}</span>
                      <div>
                        <div style={{ fontWeight:800, color:"#1E3A5F", fontSize:13 }}>{province.name}</div>
                        <div style={{ fontSize:11, color:"#64748B" }}>Hợp nhất từ: {province.merged.join(" + ")}</div>
                      </div>
                    </div>

                    {/* Topic selector */}
                    <div>
                      <label className="label" style={{fontSize:11}}>Chủ đề địa phương muốn tích hợp <span className="req">*</span></label>
                      <select className="inp" value={localTopic} onChange={e => { setLocalTopic(e.target.value); setResults([]); }}>
                        <option value="">-- Chọn chủ đề --</option>
                        {LOCAL_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div style={{ marginTop:9, background:"#DBEAFE", border:"1px solid #BFDBFE", borderRadius:8, padding:"7px 11px", fontSize:11.5, color:"#1D4ED8", display:"flex", gap:7 }}>
                      <span>💡</span>
                      <span>AI sẽ lấy ít nhất 50% câu hỏi có gắn với địa danh, con người, sự kiện thực tế của <strong>{province.name}</strong>, phần còn lại theo SGK.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Generate button */}
              <button className="btn btn-p btn-lg" style={{ width:"100%", justifyContent:"center", marginBottom:18,
                background: localBlend ? "linear-gradient(135deg,#D97706,#7C3AED)" : "linear-gradient(135deg,#7C3AED,#5B21B6)" }}
                onClick={generate} disabled={loading || selectedLessons.length === 0 || (localBlend && !localTopic)}>
                {loading ? "⏳ Đang tạo câu hỏi..." :
                  localBlend
                    ? `✨ Sinh ${count} câu (SGK + ${province.name})`
                    : `✨ Sinh ${count} câu hỏi với AI`}
              </button>

              {/* Loading state */}
              {loading && (
                <div className="ai-thinking">
                  <div className="ai-dot"/><div className="ai-dot"/><div className="ai-dot"/>
                  <span>AI đang tạo câu hỏi về <strong>{localBlend ? `${displayLabel}` : (selectedLessons.length === 1 ? selectedLessons[0] : `${selectedLessons.length} bài học`)}</strong>...</span>
                </div>
              )}


              {/* Error */}
              {error && (
                error === "__auth__"
                  ? <AuthErrBanner navigate={navigate} />
                  : <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:9, padding:"10px 14px", color:"#DC2626", fontSize:13.5, marginBottom:12 }}>
                      ⚠️ {error}
                    </div>
              )}
              {qmError && quickMode && (
                qmError === "__auth__"
                  ? <AuthErrBanner navigate={navigate} />
                  : <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:9, padding:"10px 14px", color:"#DC2626", fontSize:13.5, marginBottom:12 }}>⚠️ {qmError}</div>
              )}
              </> /* close curriculum fragment */
              )} {/* close quickMode ternary */}

              {/* Results (shared between both modes) */}
              {results.length > 0 && (
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <div style={{ fontSize:13.5, fontWeight:700, color:"#1E293B" }}>
                      {results.length} câu hỏi được tạo — đã chọn {selected.length}
                    </div>
                    <div style={{ display:"flex", gap:7 }}>
                      <button className="btn btn-g btn-sm" onClick={() => setSelected(results.map(q=>q._id))}>Chọn tất cả</button>
                      <button className="btn btn-g btn-sm" onClick={() => setSelected([])}>Bỏ chọn</button>
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:9, maxHeight:380, overflowY:"auto", marginBottom:16 }}>
                    {results.map((q, i) => (
                      <div key={q._id}
                        className={`ai-q-card ${selected.includes(q._id)?"selected":""}`}
                        onClick={() => setSelected(s => s.includes(q._id) ? s.filter(x=>x!==q._id) : [...s,q._id])}>
                        <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                          <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${selected.includes(q._id)?"#22C55E":"#CBD5E1"}`, background: selected.includes(q._id)?"#22C55E":"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1, transition:"all .14s" }}>
                            {selected.includes(q._id) && <Ic.Chk />}
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontWeight:700, color:"#1E293B", fontSize:13.5, marginBottom:8, lineHeight:1.5 }}>
                              {i+1}. {q.content}
                            </div>
                            {/* Subject + difficulty tags for quick mode */}
                            {(q.subject || q.difficulty) && (
                              <div style={{ display:"flex", gap:5, marginBottom:6, flexWrap:"wrap" }}>
                                {q.subject && <span style={{background:SMETA[q.subject]?.bg||"#F1F5F9",color:SMETA[q.subject]?.dark||"#374151",borderRadius:100,padding:"2px 8px",fontSize:11,fontWeight:700}}>{SMETA[q.subject]?.emoji} {q.subject}</span>}
                                {q.difficulty && <DBadge d={q.difficulty}/>}
                                {q.lesson && <span className="badge bg" style={{fontSize:11}}>📖 {q.lesson}</span>}
                              </div>
                            )}
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3px 12px", marginBottom: q.note ? 7 : 0 }}>
                              {["a","b","c","d"].map(opt => (
                                <div key={opt} style={{ display:"flex", gap:6, alignItems:"center", fontSize:12.5 }}>
                                  <span style={{ width:18, height:18, borderRadius:5, background: opt===q.correct?"#D97706":"#F1F5F9", color: opt===q.correct?"#fff":"#94A3B8", fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{opt.toUpperCase()}</span>
                                  <span style={{ color: opt===q.correct?"#D97706":"#64748B", fontWeight: opt===q.correct?700:400 }}>{q[opt]}</span>
                                </div>
                              ))}
                            </div>
                            {q.note && <div style={{ fontSize:11.5, color:"#0369A1", background:"#EFF6FF", borderRadius:6, padding:"4px 9px", marginTop:7 }}>💡 {q.note}</div>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <button className="btn btn-g" onClick={() => { setResults([]); setSelected([]); setQmPlan(null); }}>← Tạo lại</button>
                    <button className="btn btn-p btn-lg" disabled={selected.length === 0} onClick={doAdd}>
                      <Ic.Chk /> Thêm {selected.length} câu vào ngân hàng
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────── AUTH ERROR BANNER ────────────
function AuthErrBanner({ navigate }) {
  return (
    <div style={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:10, padding:"12px 15px", display:"flex", gap:10, alignItems:"center" }}>
      <span style={{fontSize:20}}>🔑</span>
      <div style={{flex:1}}>
        <div style={{fontWeight:800,color:"#DC2626",fontSize:13.5,marginBottom:3}}>Chưa có API Key</div>
        <div style={{fontSize:12.5,color:"#7F1D1D",lineHeight:1.5}}>Vui lòng nhập Anthropic API Key để dùng tính năng AI.</div>
      </div>
      {navigate && (
        <button onClick={() => navigate("settings")}
          style={{background:"#DC2626",color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12.5,fontWeight:800,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
          → Cài đặt
        </button>
      )}
    </div>
  );
}

// ─────────── SHEETJS LOADER ────────────
let _xlsxReady = false;
const loadXLSX = () => new Promise((res, rej) => {
  if (window.XLSX) { res(window.XLSX); return; }
  if (_xlsxReady) { res(window.XLSX); return; }
  const s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
  s.onload = () => { _xlsxReady = true; res(window.XLSX); };
  s.onerror = rej;
  document.head.appendChild(s);
});

// ─────────── EXCEL IMPORT MODAL ────────────
const EXCEL_COLS = [
  { key:"content",    label:"Nội dung câu hỏi",   req:true  },
  { key:"a",          label:"Đáp án A",            req:true  },
  { key:"b",          label:"Đáp án B",            req:true  },
  { key:"c",          label:"Đáp án C",            req:true  },
  { key:"d",          label:"Đáp án D",            req:true  },
  { key:"correct",    label:"Đáp án đúng (a/b/c/d)",req:true },
  { key:"subject",    label:"Môn học",             req:true  },
  { key:"grade",      label:"Khối lớp (6/7/8/9)",  req:true  },
  { key:"difficulty", label:"Độ khó",              req:false },
  { key:"lesson",     label:"Bài học",             req:false },
  { key:"week",       label:"Tuần",                req:false },
  { key:"note",       label:"Ghi chú",             req:false },
];

// Normalise a raw row from Excel → question object
const normaliseRow = (row, idx, nextId) => {
  const get = (...keys) => {
    for (const k of keys) {
      for (const rk of Object.keys(row)) {
        if (rk.toLowerCase().replace(/\s+/g,"").includes(k.toLowerCase())) {
          const v = String(row[rk] ?? "").trim();
          if (v) return v;
        }
      }
    }
    return "";
  };

  const correctRaw = get("đúng","correct","answer","dapandung").toLowerCase();
  const correct = ["a","b","c","d"].includes(correctRaw) ? correctRaw : "a";

  const gradeRaw = get("lớp","khối","grade").replace(/[^0-9]/g,"");
  const grade = ["6","7","8","9"].includes(gradeRaw) ? gradeRaw : "6";

  const subRaw = get("môn","subject").toLowerCase();
  const subject = SUBJECTS.find(s => subRaw.includes(s.toLowerCase().split(" ")[0])) || SUBJECTS[0];

  const diffRaw = get("khó","difficulty","độkhó").toLowerCase();
  const difficulty = diffRaw.includes("khó") && !diffRaw.includes("trung") ? "Khó"
    : diffRaw.includes("trung") ? "Trung bình" : "Dễ";

  const content = get("nội dung","content","câu","question");
  const errors = [];
  if (!content) errors.push("Thiếu nội dung câu hỏi");
  if (!get("a","đáp án a","answera")) errors.push("Thiếu đáp án A");
  if (!get("b","đáp án b","answerb")) errors.push("Thiếu đáp án B");

  return {
    _row: idx,
    _errors: errors,
    id: nextId + idx,
    content,
    a: get("đáp án a","answera","a","option_a"),
    b: get("đáp án b","answerb","b","option_b"),
    c: get("đáp án c","answerc","c","option_c"),
    d: get("đáp án d","answerd","d","option_d"),
    correct, subject, grade, difficulty,
    lesson: get("bài","lesson"),
    week:   get("tuần","week"),
    note:   get("ghi chú","note"),
  };
};

function ExcelImportModal({ onImport, onClose, nextId }) {
  const [step, setStep] = useState("upload"); // upload | preview | done
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [sheetNames, setSheetNames] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [rawWb, setRawWb] = useState(null);
  const fileRef = useRef();

  const processFile = async (file) => {
    setLoading(true);
    setFileName(file.name);
    try {
      const XLSX = await loadXLSX();
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      setRawWb(wb);
      setSheetNames(wb.SheetNames);
      parseSheet(wb, 0);
    } catch(e) {
      alert("Không đọc được file. Vui lòng kiểm tra lại.");
    }
    setLoading(false);
  };

  const parseSheet = (wb, shIdx) => {
    const XLSX = window.XLSX;
    const ws = wb.Sheets[wb.SheetNames[shIdx]];
    const data = XLSX.utils.sheet_to_json(ws, { defval: "" });
    const parsed = data.map((r, i) => normaliseRow(r, i, nextId));
    setRows(parsed);
    setSelected(parsed.filter(r => r._errors.length === 0).map(r => r._row));
    setStep("preview");
    setActiveSheet(shIdx);
  };

  const toggleAll = () => {
    const valid = rows.filter(r => r._errors.length === 0).map(r => r._row);
    setSelected(s => s.length === valid.length ? [] : valid);
  };

  const doImport = () => {
    const toAdd = rows.filter(r => selected.includes(r._row)).map(({ _row, _errors, ...q }) => q);
    onImport(toAdd);
    setStep("done");
  };

  const downloadTemplate = async () => {
    const XLSX = await loadXLSX();
    const headers = ["Nội dung câu hỏi","Đáp án A","Đáp án B","Đáp án C","Đáp án D","Đáp án đúng (a/b/c/d)","Môn học","Khối lớp","Độ khó","Bài học","Tuần","Ghi chú"];
    const samples = [
      ["Tổng các góc trong của một tam giác bằng bao nhiêu độ?","90°","120°","180°","360°","c","Toán","6","Dễ","Bài 23: Tam giác","10",""],
      ["Tế bào là đơn vị cơ bản cấu tạo nên mọi sinh vật. Phát biểu nào sau đây ĐÚNG?","Tế bào chỉ có trong cơ thể động vật","Mọi sinh vật đều được cấu tạo từ tế bào","Vi khuẩn không có cấu tạo tế bào","Tế bào thực vật không có màng","b","KHTN","6","Trung bình","Bài 9: Tế bào","4",""],
      ["What does 'hobby' mean?","Sở thích","Công việc","Bạn bè","Gia đình","a","Tiếng Anh","7","Dễ","Unit 1: Hobbies","1","Từ vựng cơ bản Unit 1"],
    ];
    const ws = XLSX.utils.aoa_to_sheet([headers, ...samples]);
    ws["!cols"] = [50,30,30,30,30,18,14,10,14,32,8,24].map(w=>({wch:w}));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Câu hỏi");
    // Instruction sheet
    const instHeaders = ["Cột","Tên cột","Bắt buộc","Ví dụ / Ghi chú"];
    const instRows = [
      ["A","Nội dung câu hỏi","✅","Câu hỏi ngắn gọn, rõ ràng"],
      ["B","Đáp án A","✅","Đáp án lựa chọn A"],
      ["C","Đáp án B","✅","Đáp án lựa chọn B"],
      ["D","Đáp án C","✅","Đáp án lựa chọn C"],
      ["E","Đáp án D","✅","Đáp án lựa chọn D"],
      ["F","Đáp án đúng","✅","Chỉ nhập: a / b / c / d (chữ thường)"],
      ["G","Môn học","✅","KHTN / Toán / Ngữ văn / Tiếng Anh / Lịch sử & Địa lí / Tin học / GDCD / Công nghệ / GD địa phương / Hoạt động TN"],
      ["H","Khối lớp","✅","Chỉ nhập số: 6 / 7 / 8 / 9"],
      ["I","Độ khó","Không bắt buộc","Dễ / Trung bình / Khó"],
      ["J","Bài học","Không bắt buộc","Tên bài học theo SGK"],
      ["K","Tuần","Không bắt buộc","Số tuần học (1–35)"],
      ["L","Ghi chú","Không bắt buộc","Gợi ý giảng dạy"],
    ];
    const wsInst = XLSX.utils.aoa_to_sheet([instHeaders, ...instRows]);
    wsInst["!cols"] = [{wch:6},{wch:20},{wch:16},{wch:80}];
    XLSX.utils.book_append_sheet(wb, wsInst, "Hướng dẫn nhập liệu");
    XLSX.writeFile(wb, "mau_cau_hoi_rcv.xlsx");
  };

  const validCount = rows.filter(r => r._errors.length === 0).length;
  const warnCount  = rows.filter(r => r._errors.length > 0).length;

  return (
    <div className="ov">
      <div className="modal" style={{ maxWidth: 780 }}>
        <div className="mhd">
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: "#1E3A5F" }}>📥 Nhập câu hỏi từ Excel</h2>
            <p style={{ fontSize: 12.5, color: "#94A3B8", marginTop: 3 }}>
              {step === "upload" && "Tải file Excel (.xlsx / .xls / .csv) chứa câu hỏi"}
              {step === "preview" && `${fileName} — ${rows.length} hàng, ${validCount} hợp lệ${warnCount > 0 ? `, ${warnCount} lỗi` : ""}`}
              {step === "done" && "Nhập thành công!"}
            </p>
          </div>
          <button onClick={onClose} className="btn btn-g btn-ic"><Ic.X /></button>
        </div>
        <div className="mbd">

          {/* ─── STEP: UPLOAD ─── */}
          {step === "upload" && (
            <div>
              {/* Drop zone */}
              <div className={`xl-drop ${dragOver ? "over" : ""}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); }}>
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" style={{ display:"none" }}
                  onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value=""; }} />
                <div style={{ fontSize: 38, marginBottom: 10 }}>{loading ? "⏳" : "📂"}</div>
                <div style={{ fontWeight: 800, color: "#1E293B", fontSize: 15, marginBottom: 5 }}>
                  {loading ? "Đang đọc file..." : "Kéo thả file vào đây hoặc nhấn để chọn"}
                </div>
                <div style={{ fontSize: 12.5, color: "#94A3B8" }}>Hỗ trợ .xlsx, .xls, .csv</div>
              </div>

              {/* Format guide */}
              <div style={{ marginTop: 18 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#374151" }}>📋 Cấu trúc cột cần có trong file</div>
                  <button className="btn btn-d btn-sm" onClick={downloadTemplate}>
                    <Ic.Download /> Tải file mẫu (.xlsx)
                  </button>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                  {EXCEL_COLS.map(c => (
                    <div key={c.key} style={{ display:"flex", gap:8, alignItems:"center", padding:"5px 9px", background: c.req ? "#F0F9FF" : "#F8FAFC", borderRadius:8, border:`1px solid ${c.req?"#BAE6FD":"#E9EEF5"}` }}>
                      <span style={{ fontSize:10.5, fontWeight:800, color: c.req?"#0369A1":"#94A3B8", minWidth:32 }}>{c.req?"Bắt buộc":"Tuỳ chọn"}</span>
                      <span style={{ fontSize:12.5, fontWeight:700, color:"#1E293B" }}>{c.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:10, background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:9, padding:"9px 13px", fontSize:12.5, color:"#92400E", display:"flex", gap:8 }}>
                  <span>💡</span>
                  <span>Tiêu đề cột không cần đặt tên chính xác — ứng dụng tự nhận diện. Mỗi câu hỏi chiếm 1 hàng. Tải <strong>file mẫu</strong> để bắt đầu nhanh.</span>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP: PREVIEW ─── */}
          {step === "preview" && (
            <div>
              {/* Sheet selector */}
              {sheetNames.length > 1 && (
                <div style={{ display:"flex", gap:7, marginBottom:14, flexWrap:"wrap" }}>
                  <span style={{ fontSize:12.5, color:"#64748B", fontWeight:600, alignSelf:"center" }}>Sheet:</span>
                  {sheetNames.map((sn,i) => (
                    <div key={sn} className={`rc ${activeSheet===i?"on":""}`} onClick={() => parseSheet(rawWb, i)}>{sn}</div>
                  ))}
                </div>
              )}

              {/* Summary */}
              <div style={{ display:"flex", gap:9, marginBottom:14, flexWrap:"wrap" }}>
                <div className="xl-row ok" style={{ flex:1 }}>✅ <strong>{validCount}</strong> câu hợp lệ sẵn sàng nhập</div>
                {warnCount > 0 && <div className="xl-row err" style={{ flex:1 }}>⚠️ <strong>{warnCount}</strong> hàng có lỗi, sẽ bỏ qua</div>}
              </div>

              {/* Preview table */}
              <div style={{ border:"1px solid #E9EEF5", borderRadius:10, overflow:"hidden", marginBottom:14 }}>
                <div style={{ maxHeight:320, overflowY:"auto" }}>
                  <table className="preview-tbl">
                    <thead>
                      <tr>
                        <th style={{ width:32 }}>
                          <input type="checkbox"
                            checked={selected.length === validCount && validCount > 0}
                            onChange={toggleAll} />
                        </th>
                        <th>#</th>
                        <th style={{ minWidth:200 }}>Nội dung câu hỏi</th>
                        <th>Đúng</th>
                        <th>Môn</th>
                        <th>Lớp</th>
                        <th>Khó</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map(r => (
                        <tr key={r._row} style={{ opacity: r._errors.length > 0 ? 0.5 : 1 }}>
                          <td>
                            {r._errors.length === 0 && (
                              <input type="checkbox"
                                checked={selected.includes(r._row)}
                                onChange={() => setSelected(s => s.includes(r._row) ? s.filter(x=>x!==r._row) : [...s,r._row])} />
                            )}
                          </td>
                          <td style={{ color:"#94A3B8", fontSize:11 }}>{r._row+1}</td>
                          <td style={{ maxWidth:220 }}>{r.content || <em style={{color:"#EF4444"}}>Trống</em>}</td>
                          <td><span style={{ fontWeight:800, color:"#D97706" }}>{r.correct?.toUpperCase()}</span></td>
                          <td><SBadge s={r.subject} /></td>
                          <td><GBadge g={r.grade} /></td>
                          <td><DBadge d={r.difficulty} /></td>
                          <td>
                            {r._errors.length === 0
                              ? <span className="badge bgr">✓ Hợp lệ</span>
                              : <span className="badge bred" title={r._errors.join(", ")}>⚠ Lỗi</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <button className="btn btn-g" onClick={() => setStep("upload")}>← Chọn file khác</button>
                <div style={{ display:"flex", gap:9, alignItems:"center" }}>
                  <span style={{ fontSize:13, color:"#64748B" }}>Đã chọn <strong>{selected.length}</strong> câu</span>
                  <button className="btn btn-p" disabled={selected.length === 0} onClick={doImport}>
                    <Ic.Download /> Nhập {selected.length} câu vào ngân hàng
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP: DONE ─── */}
          {step === "done" && (
            <div style={{ textAlign:"center", padding:"30px 0" }}>
              <div style={{ fontSize:52, marginBottom:14 }}>🎉</div>
              <h3 style={{ fontSize:20, fontWeight:900, color:"#1E293B", marginBottom:8 }}>Nhập thành công!</h3>
              <p style={{ color:"#64748B", fontSize:14, marginBottom:24 }}>
                Đã thêm <strong style={{color:"#D97706"}}>{selected.length} câu hỏi</strong> vào ngân hàng.
              </p>
              <div style={{ display:"flex", gap:9, justifyContent:"center" }}>
                <button className="btn btn-g" onClick={() => { setStep("upload"); setRows([]); setSelected([]); setFileName(""); }}>
                  Nhập thêm file khác
                </button>
                <button className="btn btn-p" onClick={onClose}>Xong</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────── CONFIRM DIALOG ────────────
function ConfirmDialog({ title, message, onOk, onCancel, okLabel="Xóa", okClass="btn-r" }) {
  return (
    <div className="confirm-ov" onClick={onCancel}>
      <div className="confirm-box" onClick={e => e.stopPropagation()}>
        <div className="confirm-title">{title}</div>
        <div className="confirm-msg">{message}</div>
        <div className="confirm-btns">
          <button className="btn btn-g" onClick={onCancel}>Hủy</button>
          <button className={`btn ${okClass}`} onClick={onOk}>{okLabel}</button>
        </div>
      </div>
    </div>
  );
}

// ─────────── QUESTION BANK ────────────
function QuestionBank({ questions, setQuestions, contests, setContests }) {
  const [s, setS] = useState("");
  const [fs, setFs] = useState("Tất cả");
  const [fg, setFg] = useState("Tất cả");
  const [fd, setFd] = useState("Tất cả");
  const [view, setView] = useState("list"); // "list" | "contest"
  const [openGroups, setOpenGroups] = useState({}); // contestId -> bool
  const [modal, setModal] = useState(null);
  const [xlModal, setXlModal] = useState(false);
  const [aiModal, setAiModal] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null);
  const [confirmDelAll, setConfirmDelAll] = useState(false);
  const nid = useRef(Math.max(0, ...(questions.length ? questions.map(q=>q.id) : [0])) + 1);

  const filtered = questions.filter(q => {
    if (fs !== "Tất cả" && q.subject !== fs) return false;
    if (fg !== "Tất cả" && q.grade !== fg) return false;
    if (fd !== "Tất cả" && q.difficulty !== fd) return false;
    if (s && !q.content.toLowerCase().includes(s.toLowerCase())) return false;
    return true;
  });

  const save = f => {
    if (modal.mode === "add") setQuestions(p => [...p, { ...f, id: nid.current++ }]);
    else setQuestions(p => p.map(q => q.id === modal.q.id ? { ...f, id: modal.q.id } : q));
    setModal(null);
  };
  const del = id => { setQuestions(p => p.filter(q => q.id !== id)); };
  const hasFilter = s || fs !== "Tất cả" || fg !== "Tất cả" || fd !== "Tất cả";

  // Build "which contests use this question"
  const qInContests = {};
  (contests || []).forEach(c => {
    (c.questionIds || []).forEach(qid => {
      if (!qInContests[qid]) qInContests[qid] = [];
      qInContests[qid].push(c);
    });
  });

  // Questions NOT in any contest
  const unusedIds = new Set(questions.filter(q => !qInContests[q.id]).map(q => q.id));

  const handleImport = (newQs) => {
    const maxId = Math.max(...questions.map(q => q.id), nid.current, 0);
    const withIds = newQs.map((q, i) => ({ ...q, id: maxId + i + 1 }));
    nid.current = maxId + newQs.length + 1;
    setQuestions(p => [...p, ...withIds]);
  };

  const handleExport = async () => {
    try {
      const XLSX = await loadXLSX();
      const src = filtered.length < questions.length ? filtered : questions;
      const headers = ["Nội dung câu hỏi","Đáp án A","Đáp án B","Đáp án C","Đáp án D","Đáp án đúng (a/b/c/d)","Môn học","Khối lớp","Độ khó","Bài học","Tuần","Ghi chú"];
      const sampleRow = ["Tổng các góc trong của một tam giác bằng bao nhiêu độ?","90°","120°","180°","360°","c","Toán","6","Dễ","Bài 23: Tam giác","10",""];
      const dataRows = src.map(q => [
        q.content, q.a, q.b, q.c, q.d,
        q.correct, q.subject, q.grade,
        q.difficulty, q.lesson||"", q.week||"", q.note||"",
      ]);
      const ws = XLSX.utils.aoa_to_sheet([headers, ...(src.length === 0 ? [sampleRow] : dataRows)]);
      // Style header row width
      ws["!cols"] = [50,30,30,30,30,18,14,12,14,30,8,20].map(w=>({wch:w}));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Câu hỏi");
      // Add instruction sheet
      const instHeaders = ["Cột","Tên cột","Bắt buộc","Ví dụ / Ghi chú"];
      const instRows = [
        ["A","Nội dung câu hỏi","✅ Bắt buộc","Tổng các góc trong của một tam giác bằng bao nhiêu độ?"],
        ["B","Đáp án A","✅ Bắt buộc","90°"],
        ["C","Đáp án B","✅ Bắt buộc","120°"],
        ["D","Đáp án C","✅ Bắt buộc","180°"],
        ["E","Đáp án D","✅ Bắt buộc","360°"],
        ["F","Đáp án đúng (a/b/c/d)","✅ Bắt buộc","c  (chỉ nhập 1 ký tự: a, b, c hoặc d)"],
        ["G","Môn học","✅ Bắt buộc","KHTN / Toán / Ngữ văn / Tiếng Anh / Lịch sử & Địa lí / Tin học / GDCD / Công nghệ / GD địa phương / Hoạt động TN"],
        ["H","Khối lớp","✅ Bắt buộc","6 / 7 / 8 / 9  (chỉ nhập số)"],
        ["I","Độ khó","Tuỳ chọn","Dễ / Trung bình / Khó  (mặc định: Dễ)"],
        ["J","Bài học","Tuỳ chọn","Bài 23: Tam giác"],
        ["K","Tuần","Tuỳ chọn","10"],
        ["L","Ghi chú","Tuỳ chọn","Gợi ý giảng dạy ngắn (nếu có)"],
        ["","","",""],
        ["","💡 LƯU Ý:","",""],
        ["","Tiêu đề cột (hàng 1) phải giữ nguyên, không xoá hoặc đổi tên","",""],
        ["","Mỗi câu hỏi là 1 hàng, bắt đầu từ hàng 2","",""],
        ["","Không để ô trống ở các cột bắt buộc","",""],
        ["","Cột Đáp án đúng: chỉ nhập a, b, c, hoặc d (chữ thường)","",""],
      ];
      const wsInst = XLSX.utils.aoa_to_sheet([instHeaders, ...instRows]);
      wsInst["!cols"] = [{wch:6},{wch:28},{wch:14},{wch:80}];
      XLSX.utils.book_append_sheet(wb, wsInst, "Hướng dẫn nhập liệu");
      XLSX.writeFile(wb, `cau_hoi_rcv_${new Date().toISOString().slice(0,10)}.xlsx`);
    } catch(e) { alert("Không xuất được file. Thử lại nhé!"); }
  };

  const toggleGroup = id => setOpenGroups(p => ({ ...p, [id]: !p[id] }));

  // ── Render question row (shared between views) ──
  const QRow = ({ q, idx, showUsage = false }) => (
    <div className={view === "contest" ? "cg-q-row" : "card"} style={view === "list" ? { padding:"15px 18px" } : {}}>
      <div style={{ display:"flex", gap:13, alignItems:"flex-start" }}>
        <div className={view === "contest" ? "cg-q-num" : ""} style={view === "list" ? { width:28, height:28, borderRadius:7, background:"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:"#94A3B8", flexShrink:0, marginTop:1 } : {}}>
          {idx + 1}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontWeight:700, color:"#1E293B", fontSize:14, marginBottom:8, lineHeight:1.55 }}>{q.content}</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3px 14px", marginBottom:8 }}>
            {["a","b","c","d"].map(opt => (
              <div key={opt} style={{ display:"flex", gap:6, alignItems:"center", fontSize:12.5 }}>
                <span style={{ width:18, height:18, borderRadius:5, background: opt===q.correct?"#D97706":"#F1F5F9", color: opt===q.correct?"#fff":"#94A3B8", fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{opt.toUpperCase()}</span>
                <span style={{ color: opt===q.correct?"#D97706":"#64748B", fontWeight: opt===q.correct?700:400 }}>{q[opt]}{opt===q.correct&&<span style={{fontSize:10,marginLeft:2}}>✓</span>}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap", alignItems:"center" }}>
            <SBadge s={q.subject}/><GBadge g={q.grade}/><DBadge d={q.difficulty}/>
            {q.lesson && <span className="badge bg">📖 {q.lesson}</span>}
            {q.week && <span className="badge bg">Tuần {q.week}</span>}
            {q.note && <span className="badge btl">💬 {q.note}</span>}
            {showUsage && (
              qInContests[q.id]?.length > 0
                ? <span className="used-badge">🏆 {qInContests[q.id].length} cuộc thi</span>
                : <span className="unused-badge">Chưa dùng</span>
            )}
          </div>
        </div>
        <div style={{ display:"flex", gap:6, flexShrink:0 }}>
          <button className="btn btn-g btn-ic btn-sm" onClick={() => setModal({ mode:"edit", q })}><Ic.Edit/></button>
          <button className="btn btn-r btn-ic btn-sm" onClick={() => setConfirmDel(q.id)}><Ic.Trash/></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-in" style={{ maxWidth: 1060 }}>
      {modal && <QModal q={modal.q} onSave={save} onClose={() => setModal(null)} />}
      {xlModal && <ExcelImportModal nextId={nid.current} onImport={handleImport} onClose={() => setXlModal(false)} />}
      {aiModal && <AIGenerateModal nextId={nid.current} onAdd={qs => { handleImport(qs); }} onClose={() => setAiModal(false)} contests={contests} setContests={setContests} navigate={navigate} />}
      {confirmDel !== null && (
        <ConfirmDialog title="Xóa câu hỏi?" message="Câu hỏi này sẽ bị xóa vĩnh viễn và không thể khôi phục."
          onOk={() => { del(confirmDel); setConfirmDel(null); }} onCancel={() => setConfirmDel(null)} />
      )}
      {confirmDelAll && (
        <ConfirmDialog
          title="Xóa toàn bộ ngân hàng câu hỏi?"
          message={`Tất cả ${questions.length} câu hỏi sẽ bị xóa vĩnh viễn. Nên xuất Excel sao lưu trước khi xóa.`}
          onOk={() => { setQuestions([]); setConfirmDelAll(false); }}
          onCancel={() => setConfirmDelAll(false)}
          okLabel="Xóa tất cả"
          okClass="btn-r"
        />
      )}

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
        <div>
          <h1 style={{ fontSize:21, fontWeight:900, color:"#1E293B", marginBottom:3 }}>📚 Ngân hàng câu hỏi</h1>
          <p style={{ color:"#94A3B8", fontSize:13.5 }}>
            {view === "list"
              ? <>Hiển thị <strong style={{color:"#1E293B"}}>{filtered.length}</strong> / {questions.length} câu hỏi</>
              : <>{questions.length} câu hỏi trong <strong style={{color:"#1E293B"}}>{(contests||[]).length} cuộc thi</strong> · <span style={{color:"#EF4444"}}>{unusedIds.size} chưa dùng</span></>
            }
          </p>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          {/* View toggle */}
          <div className="qb-viewtab">
            <button className={`qb-vtab ${view==="list"?"on":""}`} onClick={() => setView("list")}>≡ Danh sách</button>
            <button className={`qb-vtab ${view==="contest"?"on":""}`} onClick={() => setView("contest")}>🏆 Theo cuộc thi</button>
          </div>
          <button className="btn btn-g btn-sm" onClick={handleExport}><Ic.Upload/> Xuất Excel</button>
          <button className="btn btn-g btn-sm" onClick={() => setXlModal(true)} style={{borderColor:"#22C55E",color:"#16A34A"}}><Ic.Download/> Nhập Excel</button>
          <button className="btn btn-d btn-sm" onClick={() => setAiModal(true)} style={{background:"linear-gradient(135deg,#7C3AED,#5B21B6)"}}>✨ AI sinh câu hỏi</button>
          <button className="btn btn-r btn-sm" onClick={() => setConfirmDelAll(true)} disabled={questions.length === 0} title="Xóa toàn bộ câu hỏi">
            <Ic.Trash /> Xóa tất cả
          </button>
          <button className="btn btn-p" onClick={() => setModal({mode:"add",q:null})}><Ic.Plus/>Thêm câu hỏi</button>
        </div>
      </div>

      {/* ══════════ LIST VIEW ══════════ */}
      {view === "list" && (
        <>
          <div className="card" style={{ padding:"13px 16px", marginBottom:16, display:"flex", gap:9, flexWrap:"wrap", alignItems:"center" }}>
            <div className="ig" style={{ flex:1, minWidth:200 }}>
              <span className="ii"><Ic.Search/></span>
              <input className="inp ip" placeholder="Tìm kiếm nội dung câu hỏi..." value={s} onChange={e => setS(e.target.value)}/>
            </div>
            <div style={{ display:"flex", gap:7, alignItems:"center", flexWrap:"wrap" }}>
              <span style={{ fontSize:12, fontWeight:700, color:"#94A3B8", display:"flex", gap:3, alignItems:"center" }}><Ic.Flt/>Lọc:</span>
              <select className="inp" style={{width:140}} value={fs} onChange={e => setFs(e.target.value)}>
                <option>Tất cả</option>{SUBJECTS.map(x => <option key={x}>{x}</option>)}
              </select>
              <select className="inp" style={{width:105}} value={fg} onChange={e => setFg(e.target.value)}>
                <option>Tất cả</option>{GRADES.map(x => <option key={x}>Lớp {x}</option>)}
              </select>
              <select className="inp" style={{width:125}} value={fd} onChange={e => setFd(e.target.value)}>
                <option>Tất cả</option>{DIFFICULTIES.map(x => <option key={x}>{x}</option>)}
              </select>
              {hasFilter && <button className="btn btn-g btn-sm" onClick={() => { setS(""); setFs("Tất cả"); setFg("Tất cả"); setFd("Tất cả"); }}>✕ Xóa lọc</button>}
            </div>
          </div>
          {filtered.length === 0
            ? <div className="card"><div className="empty"><div className="empty-ico">🔍</div><div className="empty-txt">Không tìm thấy câu hỏi phù hợp</div></div></div>
            : <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {filtered.map((q, i) => <QRow key={q.id} q={q} idx={i} showUsage />)}
              </div>
          }
        </>
      )}

      {/* ══════════ CONTEST VIEW ══════════ */}
      {view === "contest" && (
        <div>
          {/* Each contest as a group */}
          {(contests||[]).map(c => {
            const cqs = questions.filter(q => c.questionIds.includes(q.id));
            const subs = c.subjects || [c.subject];
            const m = SMETA[subs[0]] || {};
            const isOpen = openGroups[c.id] !== false; // default open
            return (
              <div key={c.id} className="cg-card">
                {/* Contest header */}
                <div className="cg-header" onClick={() => toggleGroup(c.id)}>
                  <div style={{ width:38, height:38, borderRadius:10, background: m.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{m.emoji}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:800, fontSize:14.5, color:"#1E293B", marginBottom:3 }}>{c.name}</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {subs.map(s => <SBadge key={s} s={s}/>)}
                      {(c.grades||[c.grade]).map(g => <GBadge key={g} g={g}/>)}
                      <span className="badge bgr">📝 {cqs.length} câu</span>
                      <span className="badge bg">⏱ {c.timePerQuestion}s/câu</span>
                      {c.mode === "team" && <span className="badge borange">🏫 Theo lớp</span>}
                    </div>
                  </div>
                  <span className={`cg-chevron ${isOpen?"open":""}`}>▶</span>
                </div>
                {/* Questions */}
                {isOpen && (
                  <div className="cg-body">
                    {cqs.length === 0
                      ? <div style={{ padding:"16px 18px", color:"#94A3B8", fontSize:13.5, fontStyle:"italic" }}>Cuộc thi này chưa có câu hỏi nào.</div>
                      : cqs.map((q, i) => <QRow key={q.id} q={q} idx={i} />)
                    }
                  </div>
                )}
              </div>
            );
          })}

          {/* Unused questions */}
          {unusedIds.size > 0 && (
            <div className="cg-card" style={{ borderColor:"#E2E8F0", borderStyle:"dashed" }}>
              <div className="cg-header" onClick={() => toggleGroup("unused")} style={{ background:"#F8FAFC" }}>
                <div style={{ width:38, height:38, borderRadius:10, background:"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>📦</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800, fontSize:14.5, color:"#64748B", marginBottom:3 }}>Câu hỏi chưa dùng trong cuộc thi nào</div>
                  <div style={{ display:"flex", gap:6 }}>
                    <span className="unused-badge">{unusedIds.size} câu</span>
                    <span style={{ fontSize:12, color:"#94A3B8" }}>Sẵn sàng thêm vào cuộc thi mới</span>
                  </div>
                </div>
                <span className={`cg-chevron ${openGroups["unused"]!==false?"open":""}`}>▶</span>
              </div>
              {openGroups["unused"] !== false && (
                <div className="cg-body">
                  {questions.filter(q => unusedIds.has(q.id)).map((q, i) => <QRow key={q.id} q={q} idx={i} showUsage />)}
                </div>
              )}
            </div>
          )}

          {(contests||[]).length === 0 && (
            <div className="card"><div className="empty"><div className="empty-ico">🏆</div><div className="empty-txt">Chưa có cuộc thi nào được tạo.</div></div></div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────── CREATE CONTEST ────────────
function CreateContest({ questions, setQuestions, setContests, navigate }) {
  const [step, setStep] = useState(1);
  const defaultRounds = DEFAULT_ROUNDS.map(r => ({ id:r.id, name:r.name, questionCount:r.defaultCount, timePerQuestion:r.defaultTime }));
  const blank = { name:"", subjects:[], grades:[], week:"", timePerQuestion:30, totalPlayers:30, mode:"individual", teamList:[], selectedIds:[], useRounds:false, rounds:defaultRounds };
  const [f, setF] = useState(blank);
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const nid = useRef(Date.now());
  const [created, setCreated] = useState(false);
  const [inlineAiModal, setInlineAiModal] = useState(false);

  // Class list helpers — free input, teacher types anything
  const [classInputs, setClassInputs] = useState({ "6":"", "7":"", "8":"", "9":"" });

  const addClassTag = (g, raw) => {
    const names = raw.split(/[,;\s]+/).map(s => s.trim()).filter(Boolean);
    if (!names.length) return;
    const existing = f.teamList;
    const toAdd = names.filter(n => !existing.includes(n));
    if (toAdd.length) set("teamList", [...existing, ...toAdd]);
    setClassInputs(p => ({ ...p, [g]: "" }));
  };

  const removeClassTag = name => set("teamList", f.teamList.filter(c => c !== name));

  const quickFill = (g, count) => {
    const names = Array.from({ length: count }, (_, i) => `${g}A${i + 1}`);
    const existing = f.teamList;
    const toAdd = names.filter(n => !existing.includes(n));
    if (toAdd.length) set("teamList", [...existing, ...toAdd]);
  };

  const clearGrade = g => set("teamList", f.teamList.filter(c => !c.startsWith(g)));

  // Toggle subject in array
  const toggleSubject = s => {
    const cur = f.subjects;
    set("subjects", cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s]);
    set("selectedIds", []);
  };
  // Toggle grade in array
  const toggleGrade = g => {
    const cur = f.grades;
    const next = cur.includes(g) ? cur.filter(x => x !== g) : [...cur, g];
    set("grades", next);
    set("selectedIds", []);
  };

  // Question pool: match any selected subject AND any selected grade
  const pool = questions.filter(q =>
    (f.subjects.length === 0 || f.subjects.includes(q.subject)) &&
    (f.grades.length === 0   || f.grades.includes(q.grade)) &&
    (!f.week || q.week === f.week)
  );

  const toggle = id => set("selectedIds", f.selectedIds.includes(id) ? f.selectedIds.filter(x => x !== id) : [...f.selectedIds, id]);

  const step1Valid = f.name && f.subjects.length > 0 && f.grades.length > 0 &&
    (f.mode === "individual" || f.teamList.length >= 2);

  const create = () => {
    setContests(p => [...p, {
      ...f,
      id: nid.current++,
      questionIds: f.selectedIds,
      status: "ready",
      createdAt: new Date().toISOString().slice(0, 10),
      totalPlayers: f.mode === "team" ? f.teamList.length : f.totalPlayers,
    }]);
    setCreated(true);
  };

  const STEPS = [{ n: 1, l: "Thông tin cơ bản" }, { n: 2, l: "Chọn câu hỏi" }, { n: 3, l: "Xác nhận & Tạo" }];

  if (created) return (
    <div className="page-in" style={{ maxWidth: 500, margin: "60px auto", textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: "#1E293B", marginBottom: 8 }}>Tạo cuộc thi thành công!</h2>
      <div style={{ color: "#64748B", fontSize: 14, marginBottom: 24, lineHeight: 1.7 }}>
        Cuộc thi <strong style={{ color: "#D97706" }}>"{f.name}"</strong> đã được tạo với <strong>{f.selectedIds.length} câu hỏi</strong> và sẵn sàng tổ chức.
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button className="btn btn-g" onClick={() => navigate("game")}>🔔 Vào Rung Chuông Vàng</button>
        <button className="btn btn-p" onClick={() => { setStep(1); setF(blank); setCreated(false); }}><Ic.Plus />Tạo cuộc thi khác</button>
      </div>
    </div>
  );

  return (
    <div className="page-in" style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 21, fontWeight: 900, color: "#1E293B", marginBottom: 3 }}>➕ Tạo cuộc thi mới</h1>
        <p style={{ color: "#94A3B8", fontSize: 13.5 }}>Thiết lập cuộc thi Rung Chuông Vàng trong 3 bước đơn giản</p>
      </div>

      <div className="step-bar">
        {STEPS.map((s, i) => (
          <div key={s.n} style={{ display: "flex", flex: 1, alignItems: "center" }}>
            <div className={`step-i ${step > s.n ? "done" : step === s.n ? "active" : ""}`} style={{ cursor: step > s.n ? "pointer" : "default" }} onClick={() => step > s.n && setStep(s.n)}>
              <div className="step-dot">{step > s.n ? "✓" : s.n}</div>
              <span style={{ whiteSpace: "nowrap" }}>{s.l}</span>
            </div>
            {i < STEPS.length - 1 && <div className="step-ln" style={{ background: step > s.n + 1 ? "#D97706" : "#E2E8F0" }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="card" style={{ padding: "22px 24px" }}>
          <div className="sec-title">📋 Thông tin cuộc thi</div>
          <div style={{ marginBottom: 16 }}>
            <label className="label">Tên cuộc thi <span className="req">*</span></label>
            <input className="inp" value={f.name} onChange={e => set("name", e.target.value)} placeholder="VD: Rung Chuông Vàng – Tổng hợp HK2 Lớp 7" />
            <div className="hint">Đặt tên rõ ràng để dễ phân biệt sau này</div>
          </div>

          {/* ── Hình thức thi ── */}
          <div style={{ marginBottom: 18 }}>
            <label className="label">🎮 Hình thức thi</label>
            <div className="mode-toggle">
              <button className={`mode-btn ${f.mode === "individual" ? "on" : ""}`}
                onClick={() => set("mode", "individual")}>
                👤 Thi cá nhân – Số đeo
              </button>
              <button className={`mode-btn ${f.mode === "team" ? "on" : ""}`}
                onClick={() => set("mode", "team")}>
                🏫 Thi theo lớp
              </button>
            </div>
            <div className="hint" style={{ marginTop: 6 }}>
              {f.mode === "individual"
                ? "Từng học sinh mang số đeo, bị loại cá nhân khi trả lời sai."
                : "Mỗi đơn vị thi là một lớp. Cả lớp bị loại khi lớp đó trả lời sai."}
            </div>
          </div>

          {/* ── Môn học: multi-chip ── */}
          <div style={{ marginBottom: 16 }}>
            <label className="label">
              Môn học <span className="req">*</span>
              {f.subjects.length > 0 && <span style={{marginLeft:8,fontSize:11,fontWeight:600,color:"#D97706",background:"#FEF3C7",padding:"1px 8px",borderRadius:100}}>Đã chọn {f.subjects.length} môn</span>}
            </label>
            <div className="subj-grid">
              {SUBJECTS.map(s => {
                const m = SMETA[s] || {};
                const on = f.subjects.includes(s);
                return (
                  <div key={s}
                    className={`subj-chip ${on ? "on" : ""}`}
                    style={on ? { borderColor: m.color, background: m.bg } : {}}
                    onClick={() => toggleSubject(s)}>
                    <span className="subj-chip-ico">{m.emoji}</span>
                    <span className="subj-chip-lbl" style={{ color: on ? m.dark : "#475569" }}>{s}</span>
                    <span className="subj-chip-chk" style={on ? { borderColor: m.color, background: m.color } : {}}>
                      {on && <Ic.Chk />}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="hint">Nhấn chọn một hoặc nhiều môn. Câu hỏi từ tất cả môn được chọn sẽ vào chung một bộ đề.</div>
          </div>

          {/* ── Khối lớp: multi-chip ── */}
          <div style={{ marginBottom: 16 }}>
            <label className="label">
              Khối lớp <span className="req">*</span>
              {f.grades.length > 0 && <span style={{marginLeft:8,fontSize:11,fontWeight:600,color:"#1D4ED8",background:"#DBEAFE",padding:"1px 8px",borderRadius:100}}>Đã chọn {f.grades.length} lớp</span>}
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {GRADES.map(g => (
                <div key={g}
                  className={`grade-chip ${f.grades.includes(g) ? "on" : ""}`}
                  onClick={() => toggleGrade(g)}>
                  Lớp {g}
                </div>
              ))}
            </div>
          </div>

          {/* ── Tuần học ── */}
          <div style={{ marginBottom: 16 }}>
            <label className="label">Tuần học (để trống = tất cả các tuần)</label>
            <input className="inp" type="number" value={f.week}
              onChange={e => { set("week", e.target.value); set("selectedIds", []); }}
              placeholder="Nhập số tuần, VD: 5" min="1" max="35" style={{maxWidth:220}} />
          </div>

          {/* ── Class builder (team mode only) ── */}
          {f.mode === "team" && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label className="label" style={{ marginBottom: 0 }}>
                  🏫 Danh sách lớp thi
                  {f.teamList.length > 0 && (
                    <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 600, color: "#059669", background: "#D1FAE5", padding: "1px 8px", borderRadius: 100 }}>
                      {f.teamList.length} lớp
                    </span>
                  )}
                </label>
                {f.teamList.length > 0 && (
                  <button className="btn btn-r btn-sm" style={{ fontSize: 11.5 }}
                    onClick={() => set("teamList", [])}>
                    Xóa tất cả
                  </button>
                )}
              </div>

              {/* Per-grade input rows */}
              <div className="class-builder">
                {(f.grades.length > 0 ? f.grades.sort() : GRADES).map(g => {
                  const gradeClasses = f.teamList.filter(c => c.startsWith(g));
                  return (
                    <div key={g} style={{ marginBottom: 14 }}>
                      {/* Grade header row */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                        <div className="class-grade-label">Khối {g}</div>
                        {/* Quick fill chips */}
                        <span style={{ fontSize: 11.5, color: "#94A3B8", fontWeight: 600 }}>Điền nhanh:</span>
                        {[3, 4, 5, 6].map(n => (
                          <div key={n} className="class-count-chip"
                            onClick={() => quickFill(g, n)}>
                            {g}A1–{g}A{n}
                          </div>
                        ))}
                        {gradeClasses.length > 0 && (
                          <button style={{ marginLeft: "auto", background: "none", border: "none", color: "#EF4444", fontSize: 11.5, fontWeight: 600, cursor: "pointer" }}
                            onClick={() => clearGrade(g)}>
                            Xóa khối {g}
                          </button>
                        )}
                      </div>

                      {/* Tag input row */}
                      <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: gradeClasses.length ? 8 : 0 }}>
                        <input
                          className="inp"
                          style={{ flex: 1, maxWidth: 240, fontSize: 13 }}
                          placeholder={`VD: ${g}A6, ${g}B1, ${g}C2...`}
                          value={classInputs[g] || ""}
                          onChange={e => setClassInputs(p => ({ ...p, [g]: e.target.value }))}
                          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addClassTag(g, classInputs[g] || ""); } }}
                        />
                        <button className="btn btn-d btn-sm"
                          onClick={() => addClassTag(g, classInputs[g] || "")}
                          disabled={!(classInputs[g] || "").trim()}>
                          + Thêm
                        </button>
                      </div>

                      {/* Tags */}
                      {gradeClasses.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {gradeClasses.map(cls => (
                            <div key={cls}
                              style={{ display: "flex", alignItems: "center", gap: 5, background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 8, padding: "4px 10px", fontSize: 13, fontWeight: 700, color: "#1D4ED8" }}>
                              <span>{cls}</span>
                              <span
                                onClick={() => removeClassTag(cls)}
                                style={{ cursor: "pointer", color: "#93C5FD", fontSize: 13, lineHeight: 1, marginLeft: 2, fontWeight: 900 }}
                                title="Xóa lớp này">✕</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {gradeClasses.length === 0 && (
                        <div style={{ fontSize: 12, color: "#CBD5E1", fontStyle: "italic" }}>Chưa có lớp nào cho khối {g}</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Total summary */}
              {f.teamList.length > 0 && (
                <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 9, padding: "9px 13px", fontSize: 13, color: "#166534", display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                  <span>🏫</span>
                  <span>Tổng cộng <strong>{f.teamList.length} lớp</strong> sẽ tham gia thi đấu: {f.teamList.join(", ")}</span>
                </div>
              )}
              <div className="hint" style={{ marginTop: 6 }}>
                Nhập tên lớp tùy ý (VD: 6A1, 6B2, 7CB1...) rồi nhấn <strong>Thêm</strong> hoặc <strong>Enter</strong>. Nhấn ✕ để xóa từng lớp.
              </div>
            </div>
          )}

          {/* Preview count */}
          {(f.subjects.length > 0 || f.grades.length > 0) && (
            <div style={{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:9,padding:"10px 14px",display:"flex",gap:10,alignItems:"center",marginBottom:16,fontSize:13}}>
              <span>🔍</span>
              <span style={{color:"#0369A1"}}>
                Ngân hàng hiện có <strong>{questions.filter(q =>
                  (f.subjects.length === 0 || f.subjects.includes(q.subject)) &&
                  (f.grades.length   === 0 || f.grades.includes(q.grade)) &&
                  (!f.week || q.week === f.week)
                ).length} câu hỏi</strong> phù hợp với bộ lọc đã chọn.
              </span>
            </div>
          )}

          <div className="divider" />
          <div className="sec-title">⚙️ Thiết lập thi</div>
          <div style={{ display: "grid", gridTemplateColumns: f.mode === "team" ? "1fr 1fr" : "1fr 1fr 1fr", gap: 14 }}>
            <div>
              <label className="label">⏱ Thời gian mỗi câu (giây)</label>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 8 }}>
                {[15, 20, 25, 30, 45, 60].map(t => <div key={t} className={`rc ${f.timePerQuestion === t ? "on" : ""}`} onClick={() => set("timePerQuestion", t)}>{t}s</div>)}
              </div>
              <input className="inp" type="number" value={f.timePerQuestion} onChange={e => set("timePerQuestion", +e.target.value)} min="10" max="120" />
            </div>

            {/* ── Tổng số câu thi ── */}
            <div>
              <label className="label">📝 Tổng số câu cần thi</label>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 8 }}>
                {[10, 15, 20, 25, 30].map(t => <div key={t} className={`rc ${f.totalQuestions === t ? "on" : ""}`} onClick={() => set("totalQuestions", t)}>{t} câu</div>)}
              </div>
              <input className="inp" type="number" value={f.totalQuestions || ""} onChange={e => set("totalQuestions", +e.target.value || undefined)} min="5" max="100" placeholder="Để trống = chọn tất cả" />
              <div className="hint">Giới hạn số câu sẽ dùng trong cuộc thi (lấy ngẫu nhiên nếu pool nhiều hơn)</div>
            </div>

            {f.mode === "individual" && (
              <div>
                <label className="label">👥 Số học sinh tham gia</label>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 8 }}>
                  {[20, 25, 30, 35, 40].map(t => <div key={t} className={`rc ${f.totalPlayers === t ? "on" : ""}`} onClick={() => set("totalPlayers", t)}>{t} HS</div>)}
                </div>
                <input className="inp" type="number" value={f.totalPlayers} onChange={e => set("totalPlayers", +e.target.value)} min="2" max="100" />
              </div>
            )}
            {f.mode === "team" && f.teamList.length > 0 && (
              <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 9, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center", fontSize: 13, alignSelf:"end" }}>
                <span>🏫</span>
                <span style={{ color: "#92400E" }}>Thi theo lớp: <strong>{f.teamList.length} lớp</strong> tham gia đấu loại trực tiếp.</span>
              </div>
            )}
          </div>

          {/* ── Chế độ 4 vòng ── */}
          <div className="divider" style={{ margin:"16px 0" }} />
          <div style={{ marginBottom: f.useRounds ? 14 : 0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: f.useRounds ? 12 : 0 }}>
              <div>
                <div style={{ fontWeight:800, fontSize:14, color:"#1E293B", display:"flex", alignItems:"center", gap:7 }}>
                  🎯 Chế độ 4 vòng thi
                  <span style={{ fontSize:10.5, background:"#DBEAFE", color:"#1D4ED8", borderRadius:100, padding:"2px 8px", fontWeight:700 }}>Mới</span>
                </div>
                <div className="hint" style={{ marginTop:2 }}>Khởi động → Vượt chướng ngại vật → Tăng tốc → Về đích</div>
              </div>
              <label className="tgl">
                <input type="checkbox" checked={!!f.useRounds} onChange={e => set("useRounds", e.target.checked)} />
                <div className="tgl-track"/><div className="tgl-thumb"/>
              </label>
            </div>

            {f.useRounds && (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {DEFAULT_ROUNDS.map((cfg, i) => {
                  const r = f.rounds[i] || { questionCount: cfg.defaultCount, timePerQuestion: cfg.defaultTime };
                  const update = (key, val) => {
                    const next = [...f.rounds];
                    next[i] = { ...next[i], [key]: val };
                    set("rounds", next);
                  };
                  return (
                    <div key={cfg.id} style={{ border:`1.5px solid ${cfg.color}44`, borderRadius:12, padding:"13px 16px", background:`${cfg.color}08` }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                        <span style={{ fontSize:18 }}>{cfg.emoji}</span>
                        <div>
                          <div style={{ fontWeight:800, fontSize:14, color:"#1E293B" }}>Vòng {cfg.id}: {cfg.name}</div>
                          <div style={{ fontSize:11.5, color:"#64748B" }}>{cfg.desc}</div>
                        </div>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                        <div>
                          <label className="label" style={{ fontSize:11 }}>📝 Số câu hỏi</label>
                          <div style={{ display:"flex", gap:5, marginBottom:5, flexWrap:"wrap" }}>
                            {[2,3,4,5,6,8,10].map(n => (
                              <div key={n} className={`rc ${r.questionCount===n?"on":""}`}
                                style={r.questionCount===n?{borderColor:cfg.color,background:cfg.color,color:"#fff"}:{}}
                                onClick={() => update("questionCount", n)}>{n}</div>
                            ))}
                          </div>
                          <input className="inp" type="number" value={r.questionCount} min={1} max={30}
                            onChange={e => update("questionCount", +e.target.value)} />
                        </div>
                        <div>
                          <label className="label" style={{ fontSize:11 }}>⏱ Thời gian/câu (giây)</label>
                          <div style={{ display:"flex", gap:5, marginBottom:5, flexWrap:"wrap" }}>
                            {[10,15,20,25,30,40].map(t => (
                              <div key={t} className={`rc ${r.timePerQuestion===t?"on":""}`}
                                style={r.timePerQuestion===t?{borderColor:cfg.color,background:cfg.color,color:"#fff"}:{}}
                                onClick={() => update("timePerQuestion", t)}>{t}s</div>
                            ))}
                          </div>
                          <input className="inp" type="number" value={r.timePerQuestion} min={5} max={120}
                            onChange={e => update("timePerQuestion", +e.target.value)} />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div style={{ background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:9, padding:"9px 13px", fontSize:12.5, color:"#1D4ED8", display:"flex", gap:8 }}>
                  <span>💡</span>
                  <span>Tổng: <strong>{f.rounds.reduce((s,r)=>s+(r.questionCount||0),0)} câu</strong> — {f.rounds.map((r,i)=>`Vòng ${i+1}: ${r.questionCount||0}c/${r.timePerQuestion||30}s`).join(" · ")}</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-p" disabled={!step1Valid} onClick={() => setStep(2)}>Tiếp: Chọn câu hỏi →</button>
          </div>
          {!step1Valid && f.name && (
            <div style={{textAlign:"right",marginTop:6,fontSize:12,color:"#94A3B8"}}>
              {f.subjects.length === 0 && "⚠ Chưa chọn môn học  "}
              {f.grades.length === 0 && "⚠ Chưa chọn khối lớp  "}
              {f.mode === "team" && f.teamList.length < 2 && "⚠ Cần ít nhất 2 lớp thi"}
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          {/* Inline AI modal for generating questions directly into this contest */}
          {inlineAiModal && (
            <AIGenerateModal
              nextId={Math.max(0, ...(questions.length ? questions.map(q=>q.id) : [0])) + 1}
              lockSubjects={f.subjects}
              lockGrades={f.grades}
              onAdd={newQs => {
                const maxId = Math.max(...questions.map(q=>q.id), 0);
                const withIds = newQs.map((q,i) => ({ ...q, id: maxId + i + 1 }));
                setQuestions(prev => [...prev, ...withIds]);
                set("selectedIds", [...f.selectedIds, ...withIds.map(q=>q.id)]);
                setInlineAiModal(false);
              }}
              onClose={() => setInlineAiModal(false)}
              contests={[]}
            />
          )}

          {/* Filter info bar */}
          <div className="card" style={{ padding: "13px 16px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                {f.subjects.map(s => <SBadge key={s} s={s} />)}
                {f.grades.map(g => <GBadge key={g} g={g} />)}
                {f.week && <span className="badge bg">Tuần {f.week}</span>}
                <span style={{ fontSize: 13, color: "#64748B" }}>— <strong>{pool.length}</strong> câu có sẵn</span>
                {f.totalQuestions > 0 && (
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: f.selectedIds.length > f.totalQuestions ? "#EF4444" : "#059669",
                    background: f.selectedIds.length > f.totalQuestions ? "#FEE2E2" : "#D1FAE5",
                    padding:"2px 9px", borderRadius:100 }}>
                    {f.selectedIds.length > f.totalQuestions
                      ? `⚠ Đã chọn ${f.selectedIds.length}/${f.totalQuestions} câu (vượt giới hạn!)`
                      : `✓ ${f.selectedIds.length}/${f.totalQuestions} câu`}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: 7, flexWrap:"wrap" }}>
                <button className="btn btn-g btn-sm" onClick={() => set("selectedIds", [])} disabled={f.selectedIds.length === 0}>Bỏ tất cả</button>
                <button className="btn btn-g btn-sm"
                  onClick={() => {
                    const ids = pool.map(q => q.id);
                    const limit = f.totalQuestions;
                    if (limit > 0 && ids.length > limit) {
                      const shuffled = [...ids].sort(() => Math.random() - .5).slice(0, limit);
                      set("selectedIds", shuffled);
                    } else {
                      set("selectedIds", ids);
                    }
                  }}
                  disabled={pool.length === 0}>
                  {f.totalQuestions > 0 && pool.length > f.totalQuestions
                    ? `🎲 Chọn ngẫu nhiên ${f.totalQuestions} câu`
                    : `Chọn tất cả (${pool.length})`}
                </button>
                <button className="btn btn-sm" style={{ background:"linear-gradient(135deg,#7C3AED,#5B21B6)", color:"#fff", border:"none" }}
                  onClick={() => setInlineAiModal(true)}>
                  ✨ AI sinh câu hỏi
                </button>
              </div>
            </div>
          </div>

          {/* Empty pool notice with AI prompt */}
          {pool.length === 0 && (
            <div style={{ background:"#F0F9FF", border:"1.5px dashed #BAE6FD", borderRadius:12, padding:"18px 20px", marginBottom:12, display:"flex", gap:14, alignItems:"center" }}>
              <span style={{fontSize:28}}>💡</span>
              <div>
                <div style={{ fontWeight:800, color:"#0369A1", marginBottom:4 }}>Ngân hàng chưa có câu hỏi phù hợp</div>
                <div style={{ fontSize:13, color:"#0284C7", marginBottom:8 }}>Dùng AI để sinh câu hỏi cho môn <strong>{f.subjects.join(", ")}</strong> — Lớp <strong>{f.grades.join(", ")}</strong> ngay tại đây.</div>
                <button className="btn btn-sm" style={{ background:"linear-gradient(135deg,#7C3AED,#5B21B6)", color:"#fff", border:"none" }}
                  onClick={() => setInlineAiModal(true)}>
                  ✨ Mở AI sinh câu hỏi
                </button>
              </div>
            </div>
          )}
          {pool.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 12 }}>
              {f.subjects.map(subj => {
                const subPool = pool.filter(q => q.subject === subj);
                if (subPool.length === 0) return null;
                const m = SMETA[subj] || {};
                const allPicked = subPool.every(q => f.selectedIds.includes(q.id));
                return (
                  <div key={subj}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{m.emoji}</span>
                        <span style={{ fontWeight: 800, fontSize: 14, color: m.dark || "#1E293B" }}>{subj}</span>
                        <span className="badge bg">{subPool.length} câu</span>
                        <span style={{ fontSize: 12, color: "#94A3B8" }}>• đã chọn {subPool.filter(q => f.selectedIds.includes(q.id)).length}</span>
                      </div>
                      <button className="btn btn-g btn-sm"
                        onClick={() => {
                          const ids = subPool.map(q => q.id);
                          if (allPicked) set("selectedIds", f.selectedIds.filter(id => !ids.includes(id)));
                          else set("selectedIds", [...new Set([...f.selectedIds, ...ids])]);
                        }}>
                        {allPicked ? "Bỏ chọn môn này" : `Chọn tất cả môn này`}
                      </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {subPool.map(q => (
                        <div key={q.id} className={`qp ${f.selectedIds.includes(q.id) ? "picked" : ""}`} onClick={() => toggle(q.id)}>
                          <div className="qpb">{f.selectedIds.includes(q.id) && <Ic.Chk />}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, color: "#1E293B", fontSize: 13.5, marginBottom: 5, lineHeight: 1.5 }}>{q.content}</div>
                            <div style={{ display: "flex", gap: 5 }}>
                              <GBadge g={q.grade} />
                              <DBadge d={q.difficulty} />
                              {q.week && <span className="badge bg">Tuần {q.week}</span>}
                              {q.lesson && <span className="badge bg">📖 {q.lesson}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="btn btn-g" onClick={() => setStep(1)}>← Quay lại</button>
            <button className="btn btn-p" disabled={f.selectedIds.length === 0} onClick={() => setStep(3)}>Tiếp: Xác nhận ({f.selectedIds.length} câu) →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card" style={{ padding: "22px 24px" }}>
          <div className="sec-title">✅ Xác nhận thông tin cuộc thi</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
            <div className="sp">
              {[
                { k: "Tên cuộc thi", v: f.name },
                { k: "Hình thức", v: f.mode === "team" ? "🏫 Thi theo lớp" : "👤 Thi cá nhân" },
                { k: "Môn học", v: f.subjects.join(" · ") },
                { k: "Khối lớp", v: f.grades.map(g=>`Lớp ${g}`).join(", ") },
                { k: "Tuần", v: f.week || "Tất cả" },
                { k: "Thời gian/câu", v: f.useRounds ? "Theo từng vòng" : `${f.timePerQuestion} giây` },
                f.mode === "team"
                  ? { k: "Số lớp thi", v: `${f.teamList.length} lớp` }
                  : { k: "Số học sinh", v: `${f.totalPlayers} người` },
                { k: "Tổng số câu giới hạn", v: f.totalQuestions > 0 ? `${f.totalQuestions} câu` : "Không giới hạn" },
                { k: "Số câu đã chọn", v: `${f.selectedIds.length} câu` },
                { k: "Chế độ thi", v: f.useRounds ? "🎯 4 vòng thi" : "Thông thường" },
              ].map(({ k, v }) => (
                <div className="spr" key={k}><span className="spk">{k}</span><span className="spv">{v}</span></div>
              ))}
              <div className="spr">
                <span className="spk">Phân bổ theo môn</span>
                <span className="spv" style={{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"flex-end"}}>
                  {f.subjects.map(s => {
                    const cnt = questions.filter(q => f.selectedIds.includes(q.id) && q.subject === s).length;
                    return cnt > 0 ? <span key={s} style={{fontSize:11}}>{SMETA[s]?.emoji} {cnt}</span> : null;
                  })}
                </span>
              </div>
              {f.mode === "team" && f.teamList.length > 0 && (
                <div className="spr" style={{flexDirection:"column",alignItems:"flex-start",gap:7}}>
                  <span className="spk">Danh sách lớp ({f.teamList.length})</span>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    {f.teamList.map(cls=>(
                      <span key={cls} style={{background:"rgba(251,191,36,.18)",color:"#FBBF24",borderRadius:6,padding:"2px 8px",fontSize:11.5,fontWeight:700}}>{cls}</span>
                    ))}
                  </div>
                </div>
              )}
              {f.useRounds && (
                <div className="spr" style={{flexDirection:"column",alignItems:"flex-start",gap:8}}>
                  <span className="spk">Cấu trúc 4 vòng thi</span>
                  <div style={{width:"100%",display:"flex",flexDirection:"column",gap:5}}>
                    {DEFAULT_ROUNDS.map((cfg,i) => {
                      const r = f.rounds[i];
                      return (
                        <div key={cfg.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:8,background:`${cfg.color}10`,border:`1px solid ${cfg.color}33`}}>
                          <span style={{fontSize:14}}>{cfg.emoji}</span>
                          <span style={{fontWeight:700,color:"#1E293B",flex:1,fontSize:13}}>Vòng {cfg.id}: {cfg.name}</span>
                          <span style={{fontSize:12,color:"#64748B"}}>{r?.questionCount||cfg.defaultCount} câu · {r?.timePerQuestion||cfg.defaultTime}s/câu</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 9 }}>Câu hỏi đã chọn ({f.selectedIds.length})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, maxHeight: 300, overflowY: "auto" }}>
                {questions.filter(q => f.selectedIds.includes(q.id)).map((q, i) => (
                  <div key={q.id} style={{ background: "#F8FAFC", borderRadius: 8, padding: "7px 10px", fontSize: 12.5, display: "flex", gap: 7, alignItems: "flex-start" }}>
                    <span style={{ fontWeight: 800, color: "#94A3B8", flexShrink: 0, minWidth: 18 }}>{i + 1}.</span>
                    <span style={{ color: SMETA[q.subject]?.color || "#94A3B8", fontWeight: 700, flexShrink: 0, fontSize: 13 }}>{SMETA[q.subject]?.emoji}</span>
                    <span style={{ color: "#374151", lineHeight: 1.45 }}>{q.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hb" style={{ marginBottom: 18 }}><span>ℹ️</span><span>Sau khi tạo, cuộc thi sẽ xuất hiện trong danh sách Rung Chuông Vàng và sẵn sàng tổ chức ngay.</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="btn btn-g" onClick={() => setStep(2)}>← Quay lại</button>
            <button className="btn btn-p btn-lg" onClick={create}>🔔 Tạo cuộc thi ngay</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────── HISTORY PAGE ────────────
function HistoryPage({ history, setHistory }) {
  const [detail, setDetail] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const delHistory = id => setHistory(p => p.filter(h => h.id !== id));

  return (
    <div className="page-in" style={{ maxWidth: 960 }}>
      {detail && <HistoryDetail h={detail} onClose={() => setDetail(null)} />}
      {confirmDel !== null && (
        <ConfirmDialog title="Xóa lịch sử?" message="Bản ghi cuộc thi này sẽ bị xóa vĩnh viễn."
          onOk={() => { delHistory(confirmDel); setConfirmDel(null); }} onCancel={() => setConfirmDel(null)} />
      )}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 22 }}>
        <div>
          <h1 style={{ fontSize: 21, fontWeight: 900, color: "#1E293B", marginBottom: 3 }}>📅 Lịch sử cuộc thi</h1>
          <p style={{ color: "#94A3B8", fontSize: 13.5 }}>{history.length} cuộc thi đã tổ chức</p>
        </div>
        {history.length > 0 && (
          <button className="btn btn-r btn-sm" onClick={() => setConfirmDel("all")}>
            <Ic.Trash /> Xóa tất cả
          </button>
        )}
      </div>
      {confirmDel === "all" && (
        <ConfirmDialog title="Xóa toàn bộ lịch sử?" message="Tất cả bản ghi lịch sử cuộc thi sẽ bị xóa vĩnh viễn."
          onOk={() => { setHistory([]); setConfirmDel(null); }} onCancel={() => setConfirmDel(null)} />
      )}
      {history.length === 0 ? (
        <div className="card"><div className="empty"><div className="empty-ico">📭</div><div className="empty-txt">Chưa có cuộc thi nào được tổ chức.</div></div></div>
      ) : (
        <div className="card" style={{ overflow: "hidden" }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>#</th><th>Tên cuộc thi</th><th>Môn</th><th>Lớp</th><th>Ngày tổ chức</th><th>HS tham gia</th><th>Câu đã thi</th><th>Người thắng</th><th>Kết quả</th><th></th>
              </tr>
            </thead>
            <tbody>{[...history].reverse().map((h, i) => (
              <tr key={h.id}>
                <td style={{ color: "#94A3B8", fontSize: 12 }}>{i + 1}</td>
                <td style={{ fontWeight: 700, color: "#1E293B", maxWidth: 200 }}>{h.name}</td>
                <td><SBadge s={(h.subjects||[h.subject])[0]} />{(h.subjects||[h.subject]).length > 1 && <span className="badge bpu" style={{marginLeft:4}}>+{(h.subjects||[h.subject]).length-1}</span>}</td>
                <td><GBadge g={h.grade} /></td>
                <td style={{ color: "#64748B", fontSize: 13 }}>{h.createdAt}</td>
                <td style={{ color: "#64748B" }}>{h.players}</td>
                <td style={{ color: "#64748B" }}>{h.questionsPlayed}</td>
                <td><div style={{ display: "flex", alignItems: "center", gap: 5 }}><span>🥇</span><span style={{ fontWeight: 700, color: "#D97706", fontSize: 13 }}>{h.winner}</span></div></td>
                <td><span className="badge bgr">{h.status}</span></td>
                <td>
                  <div style={{ display:"flex", gap:5 }}>
                    <button className="btn btn-g btn-sm" onClick={() => setDetail(h)}><Ic.Eye />Chi tiết</button>
                    <button className="btn btn-r btn-ic btn-sm" onClick={() => setConfirmDel(h.id)} title="Xóa bản ghi này"><Ic.Trash /></button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─────────── SETTINGS PAGE ────────────
const SCHOOL_LOGOS = ["🏫","🎓","📚","🔔","⭐","🏆","🌟","🎯","📖","✏️","🌸","🦋"];
const SCHOOL_TYPES = ["Tiểu học","THCS","THPT","TH–THCS","THCS–THPT"];
const PROVINCES = ["An Giang","Bắc Ninh","Cà Mau","Cao Bằng","Đà Nẵng","Đắk Lắk","Điện Biên","Đồng Nai","Đồng Tháp","Gia Lai","Hà Nội","Hải Phòng","Hà Tĩnh","Huế","Hưng Yên","Khánh Hòa","Lai Châu","Lạng Sơn","Lào Cai","Lâm Đồng","Nghệ An","Ninh Bình","Phú Thọ","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sơn La","Tây Ninh","Thái Nguyên","Thanh Hóa","TP Hồ Chí Minh","Tuyên Quang","Vĩnh Long","Cần Thơ"];

function SettingsPage({ schoolInfo, setSchoolInfo, soundOn, setSoundOn, themeId, setThemeId, fontSize, setFontSize, allData, setAllData, setShowWelcome }) {
  const [tab, setTab] = useState("school");
  const [draft, setDraft] = useState({ ...schoolInfo });
  const [apiKeys, setApiKeys] = useState(() => loadApiKeys());
  const [showAnthropic, setShowAnthropic] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [keySaved, setKeySaved] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const d = (k, v) => setDraft(p => ({ ...p, [k]: v }));

  const isDirty = JSON.stringify(draft) !== JSON.stringify(schoolInfo);

  const save = () => {
    setSchoolInfo({ ...draft });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const reset = () => setDraft({ ...schoolInfo });

  const TABS = [
    { id: "school", label: "🏫 Trường học" },
    { id: "app",    label: "⚙️ Ứng dụng" },
  ];

  return (
    <div className="page-in" style={{ maxWidth: 820 }}>
      {saved && (
        <div className="save-toast">
          <Ic.Chk /> Đã lưu thông tin thành công!
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <h1 style={{ fontSize: 21, fontWeight: 900, color: "#1E293B", marginBottom: 3 }}>⚙️ Cài đặt</h1>
          <p style={{ color: "#94A3B8", fontSize: 13.5 }}>Tuỳ chỉnh thông tin trường và giáo viên</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {isDirty && <button className="btn btn-g" onClick={reset}>↩ Hoàn tác</button>}
          <button className="btn btn-p" onClick={save} disabled={!isDirty}>
            <Ic.Chk /> Lưu thay đổi
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 620 }}>
        {/* Left: form */}
        <div>
          <div className="stab-bar">
            {TABS.map(t => (
              <button key={t.id} className={`stab ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>

          {/* ── TAB: TRƯỜNG HỌC ── */}
          {tab === "school" && (
            <div className="card" style={{ padding: "22px 24px" }}>
              <div className="sec-title">🏫 Thông tin trường</div>

              {/* Logo picker */}
              <div style={{ marginBottom: 16 }}>
                <label className="label">Logo / Biểu tượng trường</label>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{ width: 54, height: 54, borderRadius: 13, background: "#EEF2FF", border: "2px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, cursor: "pointer", flexShrink: 0, transition: "border .15s" }}
                    onClick={() => setShowEmoji(p => !p)}>
                    {draft.logo}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#64748B", marginBottom: 5 }}>Nhấn vào biểu tượng để chọn logo</div>
                    {showEmoji && (
                      <div className="emoji-grid">
                        {SCHOOL_LOGOS.map(e => (
                          <div key={e} className={`emoji-opt ${draft.logo === e ? "on" : ""}`}
                            onClick={() => { d("logo", e); setShowEmoji(false); }}>{e}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 13 }}>
                <label className="label">Tên trường <span className="req">*</span></label>
                <input className="inp" value={draft.schoolName} onChange={e => d("schoolName", e.target.value)} placeholder="VD: THCS Lý Tự Trọng" />
              </div>

              <div style={{ marginBottom: 13 }}>
                <label className="label">Loại trường</label>
                <select className="inp" value={draft.schoolType} onChange={e => d("schoolType", e.target.value)}>
                  {SCHOOL_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 4 }}>
                <div>
                  <label className="label">Phường / Xã</label>
                  <input className="inp" value={draft.ward || ""} onChange={e => d("ward", e.target.value)} placeholder="VD: Phường Long Hoa" />
                </div>
                <div>
                  <label className="label">Tỉnh / Thành phố</label>
                  <select className="inp" value={draft.province} onChange={e => d("province", e.target.value)}>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: ỨNG DỤNG ── */}
          {tab === "app" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>

              {/* ── API KEYS ── */}
              <div className="card" style={{ padding:"22px 24px", borderColor: (apiKeys.anthropic||apiKeys.gemini) ? "#A7F3D0":"#E2E8F0" }}>
                <div className="sec-title">🔑 Cấu hình AI API Key</div>
                <div style={{ background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:9, padding:"10px 13px", marginBottom:16, fontSize:13, color:"#15803D", lineHeight:1.6 }}>
                  <strong>Tại sao cần API Key?</strong> Khi không có key riêng, ứng dụng dùng key mặc định có thể bị giới hạn định mức. Nhập key của bạn để dùng không giới hạn. Key được lưu <strong>chỉ trong máy bạn</strong>, không gửi đi nơi nào khác.
                </div>

                {/* Anthropic Key */}
                <div style={{ marginBottom:16 }}>
                  <label className="label" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span>🤖 Anthropic (Claude) API Key {apiKeys.anthropic && <span style={{color:"#16A34A",fontSize:11,fontWeight:700,marginLeft:6}}>✓ Đã cài</span>}</span>
                    <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer"
                      style={{fontSize:11,color:"#7C3AED",fontWeight:700,textDecoration:"none"}}>Lấy key miễn phí →</a>
                  </label>
                  <div style={{display:"flex",gap:7}}>
                    <div style={{flex:1,position:"relative"}}>
                      <input className="inp"
                        type={showAnthropic?"text":"password"}
                        value={apiKeys.anthropic||""}
                        onChange={e => setApiKeys(k=>({...k, anthropic:e.target.value}))}
                        placeholder="sk-ant-api03-..."
                        style={{paddingRight:36}}
                      />
                      <button onClick={()=>setShowAnthropic(v=>!v)}
                        style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#94A3B8"}}>
                        {showAnthropic?"🙈":"👁️"}
                      </button>
                    </div>
                  </div>
                  <div className="hint">Định mức miễn phí: $5 ≈ sinh ~5.000 câu hỏi. Tháng sau tự động reset.</div>
                </div>

                {/* Gemini Key */}
                <div style={{ marginBottom:16 }}>
                  <label className="label" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span>✨ Google Gemini API Key {apiKeys.gemini && <span style={{color:"#16A34A",fontSize:11,fontWeight:700,marginLeft:6}}>✓ Đã cài</span>}</span>
                    <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer"
                      style={{fontSize:11,color:"#D97706",fontWeight:700,textDecoration:"none"}}>Lấy key miễn phí →</a>
                  </label>
                  <div style={{flex:1,position:"relative"}}>
                    <input className="inp"
                      type={showGemini?"text":"password"}
                      value={apiKeys.gemini||""}
                      onChange={e => setApiKeys(k=>({...k, gemini:e.target.value}))}
                      placeholder="AIza..."
                      style={{paddingRight:36}}
                    />
                    <button onClick={()=>setShowGemini(v=>!v)}
                      style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#94A3B8"}}>
                      {showGemini?"🙈":"👁️"}
                    </button>
                  </div>
                  <div className="hint">Miễn phí hoàn toàn, không giới hạn. Dùng làm dự phòng khi Claude bị rate limit.</div>
                </div>

                {/* Status indicator */}
                <div style={{ background:"#F8FAFC", border:"1px solid #E2E8F0", borderRadius:9, padding:"10px 13px", marginBottom:14, fontSize:12.5 }}>
                  <div style={{fontWeight:700,color:"#374151",marginBottom:5}}>Chiến lược hiện tại:</div>
                  <div style={{display:"flex",flexDirection:"column",gap:4}}>
                    <div style={{display:"flex",alignItems:"center",gap:7,color: apiKeys.anthropic?"#16A34A":"#94A3B8"}}>
                      <span>{apiKeys.anthropic?"✅":"⬜"}</span>
                      <span>Gọi Claude {apiKeys.anthropic?"(key riêng — không giới hạn)":"(key mặc định — có thể bị rate limit)"}</span>
                    </div>
                    <div style={{paddingLeft:20,color:"#94A3B8",fontSize:11.5}}>↓ Nếu Claude bị rate limit</div>
                    <div style={{display:"flex",alignItems:"center",gap:7,color: apiKeys.gemini?"#D97706":"#94A3B8"}}>
                      <span>{apiKeys.gemini?"✅":"⬜"}</span>
                      <span>Fallback Gemini {apiKeys.gemini?"(sẵn sàng)":"(chưa cài — sẽ báo lỗi)"}</span>
                    </div>
                  </div>
                </div>

                <div style={{display:"flex",gap:9,alignItems:"center"}}>
                  <button className="btn btn-p" onClick={() => {
                    saveApiKeys(apiKeys);
                    setKeySaved(true);
                    setTimeout(() => setKeySaved(false), 2500);
                  }}>
                    <Ic.Chk /> Lưu API Key
                  </button>
                  {(apiKeys.anthropic||apiKeys.gemini) && (
                    <button className="btn btn-g btn-sm" onClick={() => {
                      setApiKeys({});
                      saveApiKeys({});
                    }}>🗑 Xóa key</button>
                  )}
                  {keySaved && <span style={{color:"#16A34A",fontWeight:700,fontSize:13}}>✓ Đã lưu!</span>}
                </div>
              </div>
              <div className="card" style={{ padding: "22px 24px" }}>
                <div className="sec-title">📅 Năm học & học kỳ</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label className="label">Năm học</label>
                    <select className="inp" value={draft.schoolYear} onChange={e => d("schoolYear", e.target.value)}>
                      {["2022–2023","2023–2024","2024–2025","2025–2026","2026–2027"].map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Học kỳ</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["1","2"].map(s => (
                        <div key={s}
                          className={`grade-chip ${draft.semester === s ? "on" : ""}`}
                          onClick={() => d("semester", s)}
                          style={{ flex: 1, textAlign: "center" }}>
                          HK {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: "18px 20px" }}>
                <div className="sec-title">🔊 Âm thanh & hiệu ứng</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 13px", background:"#F8FAFC", borderRadius:9, border:"1px solid #F0F4F8", marginBottom:9 }}>
                  <div>
                    <div style={{ fontWeight:700, color:"#1E293B", fontSize:13.5 }}>Âm thanh trong cuộc thi</div>
                    <div style={{ fontSize:12, color:"#94A3B8", marginTop:2 }}>Hiệu ứng khi hiện đáp án, loại người chơi, kết thúc...</div>
                  </div>
                  <label className="tgl" style={{ marginLeft:16 }}>
                    <input type="checkbox" checked={soundOn} onChange={e => { setSoundOn(e.target.checked); if(e.target.checked) Sounds.start(); }} />
                    <div className="tgl-track"/>
                    <div className="tgl-thumb"/>
                  </label>
                </div>
                <div style={{ background:"#F0F9FF", border:"1px solid #BAE6FD", borderRadius:9, padding:"9px 13px", fontSize:12.5, color:"#0369A1", display:"flex", gap:8 }}>
                  <span>💡</span><span>Âm thanh dùng Web Audio API — không cần tải file. Nút tắt/bật cũng có ngay trong màn hình thi.</span>
                </div>
              </div>

              <div className="card" style={{ padding: "18px 20px" }}>
                <div className="sec-title">💾 Sao lưu & khôi phục</div>
                <div style={{ background:"#F8FAFC", border:"1px solid #E9EEF5", borderRadius:9, padding:"13px 15px", marginBottom:10 }}>
                  <div style={{ fontWeight:700, color:"#1E293B", fontSize:13.5, marginBottom:4 }}>Tự động lưu</div>
                  <div style={{ fontSize:12.5, color:"#64748B", marginBottom:11, lineHeight:1.55 }}>
                    Toàn bộ câu hỏi, cuộc thi, lịch sử và cài đặt tự động lưu vào bộ nhớ trình duyệt. Dữ liệu giữ nguyên khi tải lại trang.
                  </div>
                  <div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>
                    <button className="btn btn-d btn-sm"
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(allData, null, 2)], {type:"application/json"});
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = `rcv_backup_${new Date().toISOString().slice(0,10)}.json`;
                        a.click();
                      }}>
                      <Ic.Download/> Xuất file sao lưu (.json)
                    </button>
                    <label className="btn btn-g btn-sm" style={{ cursor:"pointer" }}>
                      <Ic.Upload/> Nhập file khôi phục
                      <input type="file" accept=".json" style={{ display:"none" }}
                        onChange={e => {
                          const f = e.target.files?.[0]; if(!f) return;
                          const reader = new FileReader();
                          reader.onload = ev => {
                            try {
                              const data = JSON.parse(ev.target.result);
                              if(data.questions && data.contests) {
                                  setAllData(data);
                                  if(data.schoolInfo) setSchoolInfo(data.schoolInfo);
                                  setSaved(true); setTimeout(()=>setSaved(false), 2500);
                              } else { alert("File không hợp lệ."); }
                            } catch { alert("Không đọc được file."); }
                          };
                          reader.readAsText(f);
                          e.target.value = "";
                        }}/>
                    </label>
                  </div>
                </div>
                <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:9, padding:"13px 15px" }}>
                  <div style={{ fontWeight:700, color:"#DC2626", fontSize:13.5, marginBottom:4 }}>Xóa toàn bộ dữ liệu</div>
                  <div style={{ fontSize:12.5, color:"#7F1D1D", marginBottom:10, lineHeight:1.55 }}>
                    Xóa hết câu hỏi, cuộc thi, lịch sử và khôi phục về dữ liệu gốc. Không thể hoàn tác — hãy xuất file sao lưu trước.
                  </div>
                  <button className="btn btn-r btn-sm"
                    onClick={() => {
                      if (!window.confirm("Xóa toàn bộ dữ liệu và khôi phục mặc định? Thao tác này không thể hoàn tác.")) return;
                      const initial = { questions: INITIAL_QUESTIONS, contests: INITIAL_CONTESTS, history: [], schoolInfo: INITIAL_SCHOOL_INFO, soundOn: true, themeId: "gold", fontSize: 15 };
                      lsSave(initial);
                      setAllData(initial);
                      setSchoolInfo(INITIAL_SCHOOL_INFO);
                    }}>
                    🗑 Xóa & khôi phục mặc định
                  </button>
                  <button className="btn btn-g btn-sm"
                    onClick={() => {
                      try { localStorage.removeItem("rcv_welcomed"); } catch(e){}
                      setShowWelcome(true);
                    }}>
                    🔔 Xem lại màn hình chào
                  </button>
                </div>
              </div>


              <div className="card" style={{ padding: "20px 22px" }}>
                <div className="sec-title">🎨 Chủ đề giao diện</div>
                <div className="theme-grid">
                  {THEMES.map(t => {
                    const on = themeId === t.id;
                    return (
                      <div key={t.id}
                        className={`theme-card ${on ? "on" : ""}`}
                        style={on ? { borderColor: t.p2 } : {}}
                        onClick={() => setThemeId(t.id)}>
                        <div className="theme-swatch" style={{ background: t.bg, border: `2px solid ${t.border}` }}>
                          <div style={{ width:14, height:36, background: `linear-gradient(180deg,${t.p1},${t.p2})`, borderRadius:"4px 0 0 4px" }}/>
                          <div style={{ flex:1, height:36, background: t.card, display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"4px 4px" }}>
                            <div style={{ height:4, background: t.dark, borderRadius:2, width:"70%" }}/>
                            <div style={{ height:3, background: t.border, borderRadius:2 }}/>
                            <div style={{ height:3, background: t.border, borderRadius:2, width:"60%" }}/>
                          </div>
                        </div>
                        <div style={{ textAlign:"center" }}>
                          <div style={{ fontSize:16, marginBottom:2 }}>{t.emoji}</div>
                          <div className="theme-name" style={{ color: on ? t.p2 : "#1E293B" }}>{t.name}</div>
                        </div>
                        {on && <div style={{ fontSize:10, fontWeight:800, color: t.p2, background: t.p3, borderRadius:100, padding:"2px 8px" }}>✓ Đang dùng</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card" style={{ padding: "20px 22px" }}>
                <div className="sec-title">🔤 Cỡ chữ</div>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
                  <span style={{ fontSize:12, color:"#64748B", fontWeight:600, minWidth:24 }}>A</span>
                  <input type="range" className="fs-slider" min={13} max={17} step={0.5}
                    value={fontSize} onChange={e => setFontSize(+e.target.value)} />
                  <span style={{ fontSize:17, color:"#1E293B", fontWeight:700, minWidth:24 }}>A</span>
                  <span style={{ marginLeft:8, fontSize:13, color:"#94A3B8", minWidth:48 }}>{fontSize}px</span>
                </div>
                <div style={{ display:"flex", gap:7 }}>
                  {[13,14,15,16,17].map(s => (
                    <div key={s} className={`rc ${fontSize===s?"on":""}`}
                      onClick={() => setFontSize(s)} style={{ flex:1, textAlign:"center" }}>
                      {s===13?"Nhỏ":s===14?"Nhỏ+":s===15?"Vừa":s===16?"To":"Rất to"}
                    </div>
                  ))}
                </div>
                <div className="hint" style={{ marginTop:8 }}>Cỡ chữ mặc định: 15px (Vừa).</div>
              </div>

              <div className="card" style={{ padding: "18px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 34, marginBottom: 9 }}>🔔</div>
                <div style={{ fontWeight: 800, color: "#1E3A5F", fontSize: 16, marginBottom: 3 }}>Rung Chuông Vàng v3.0</div>
                <div style={{ fontSize: 11.5, color: "#94A3B8", marginBottom: 8 }}>Phát hành tháng 3/2026</div>
                <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, marginBottom: 10 }}>
                  Phát triển bởi <strong style={{color:"#1E293B"}}>Cô Huỳnh Thị Thùy Dương</strong><br />THCS Lý Tự Trọng – Tây Ninh
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:12, textAlign:"left" }}>
                  {[
                    "🎯 Chế độ 4 vòng thi (Khởi động → Về đích)",
                    "⚡ AI tạo nhanh bộ đề tổng hợp",
                    "🏡 Tích hợp kiến thức địa phương 34 tỉnh",
                    "🔔 Câu phụ leo thang độ khó tự động",
                    "🔄 Xử lý tất cả bị loại cùng lúc",
                    "🔒 Đáp án do giáo viên chủ động hiện",
                    "🎊 Màn hình vinh danh hoành tráng",
                  ].map(f => (
                    <div key={f} style={{ fontSize:12, color:"#475569", display:"flex", gap:6, alignItems:"flex-start" }}>{f}</div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:7, justifyContent:"center", flexWrap:"wrap" }}>
                  {["Xuất PDF báo cáo 🚧","Google Classroom 🚧"].map(x=>(
                    <span key={x} style={{ background:"#F1F5F9", color:"#94A3B8", fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:100 }}>{x}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save warning + button */}
        {isDirty && (
          <div style={{ marginTop: 14, background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 9, padding: "10px 13px", fontSize: 12.5, color: "#92400E", display: "flex", gap: 7, alignItems: "center" }}>
            <span>⚠️</span> Có thay đổi chưa lưu. Nhấn <strong>"Lưu thay đổi"</strong> để áp dụng.
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────── GUIDE PAGE ────────────
const GUIDE_SECTIONS = [
  {
    id:"overview", icon:"🔔", color:"#FBBF24", bg:"#FEF3C7",
    title:"Tổng quan ứng dụng",
    desc:"Rung Chuông Vàng là nền tảng tổ chức thi trắc nghiệm dành cho học sinh THCS. Hỗ trợ AI sinh câu hỏi, 4 vòng thi, câu phụ leo thang độ khó, nhập/xuất Excel và quản lý toàn bộ quy trình thi.",
    steps:[
      { icon:"📋", title:"Các trang chính", body:"Ứng dụng có 7 trang: Tổng quan, Rung Chuông Vàng (danh sách cuộc thi), Ngân hàng câu hỏi, Tạo cuộc thi, Lịch sử, Cài đặt và Hướng dẫn sử dụng." },
      { icon:"💾", title:"Tự động lưu", body:"Mọi thay đổi (câu hỏi, cuộc thi, cài đặt) được lưu tự động vào bộ nhớ trình duyệt. Tải lại trang không mất dữ liệu. Nên sao lưu file .json định kỳ trong Cài đặt." },
      { icon:"🎨", title:"Đổi giao diện nhanh", body:"Nhấn 6 chấm màu trên topbar để chuyển chủ đề ngay. Có 6 chủ đề: Vàng Navy, Xanh Biển, Xanh Lá, Tím, Hồng, Dark Mode. Điều chỉnh cỡ chữ trong Cài đặt → Ứng dụng." },
      { icon:"📡", title:"Cần kết nối internet", body:"Tính năng AI sinh câu hỏi và câu phụ tự động cần kết nối internet để gọi API Claude AI. Toàn bộ dữ liệu câu hỏi và cuộc thi được lưu cục bộ trong trình duyệt." },
    ]
  },
  {
    id:"questions", icon:"📚", color:"#2563EB", bg:"#DBEAFE",
    title:"Ngân hàng câu hỏi",
    desc:"Quản lý toàn bộ câu hỏi trắc nghiệm. Hỗ trợ 4 cách thêm câu hỏi: nhập tay, nhập Excel, AI chi tiết và AI tạo nhanh.",
    steps:[
      { icon:"✏️", title:"Thêm câu hỏi thủ công", body:"Nhấn '+ Thêm câu hỏi' → Điền nội dung, 4 đáp án A/B/C/D, chọn đáp án đúng, môn, lớp, bài học và độ khó → Lưu. Câu hỏi xuất hiện ngay trong danh sách." },
      { icon:"📥", title:"Nhập từ Excel (.xlsx)", body:"Nhấn 'Nhập Excel' → Tải file mẫu có 12 cột (kèm sheet hướng dẫn chi tiết) → Điền câu hỏi → Kéo thả file vào ô upload → Xem trước, tích câu muốn nhập → Nhập vào ngân hàng." },
      { icon:"⚡", title:"AI tạo nhanh (mới)", body:"Tab '⚡ Tạo nhanh' trong cửa sổ AI: chỉ cần chọn lớp, tick các môn muốn có và nhập tổng số câu → AI tự cân đối số câu mỗi môn (~đều nhau) và phân bổ độ khó ~40% Dễ, ~40% Trung bình, ~20% Khó." },
      { icon:"✨", title:"AI chi tiết theo bài (tab '📚 Chi tiết theo bài')", body:"Chọn môn, lớp → tick các bài học cụ thể (hoặc 'Tất cả') → chọn số câu và độ khó → Sinh. AI tạo câu hỏi đúng theo nội dung từng bài trong chương trình Kết nối tri thức." },
      { icon:"🏡", title:"Tích hợp địa phương", body:"Trong cửa sổ AI, bật toggle '🏡 Tích hợp yếu tố địa phương' → chọn tỉnh/thành (34 đơn vị sau sáp nhập 1/7/2025) và chủ đề → AI lồng ghép ≥50% câu hỏi có liên quan đến địa phương đó vào nội dung SGK." },
      { icon:"📤", title:"Xuất Excel", body:"Nhấn 'Xuất Excel' → tải file .xlsx có 2 sheet: 'Câu hỏi' (dữ liệu thực tế hoặc hàng mẫu nếu ngân hàng trống) và 'Hướng dẫn nhập liệu' (mô tả đầy đủ từng cột)." },
      { icon:"🗑️", title:"Xóa tất cả", body:"Nhấn nút đỏ '🗑 Xóa tất cả' → xác nhận → toàn bộ câu hỏi bị xóa. Nên xuất Excel sao lưu trước khi xóa." },
      { icon:"🏆", title:"Xem theo cuộc thi", body:"Tab '🏆 Theo cuộc thi' nhóm câu hỏi theo từng cuộc thi đã tạo. Phần '📦 Câu hỏi chưa dùng' liệt kê các câu chưa được gán vào cuộc thi nào." },
    ]
  },
  {
    id:"create", icon:"➕", color:"#7C3AED", bg:"#EDE9FE",
    title:"Tạo cuộc thi",
    desc:"Thiết lập phiên Rung Chuông Vàng trong 3 bước. Hỗ trợ chế độ 4 vòng thi với cấu hình độc lập cho từng vòng.",
    steps:[
      { icon:"1️⃣", title:"Bước 1 – Thông tin cơ bản", body:"Đặt tên, chọn hình thức (Cá nhân / Theo lớp), chọn môn (nhiều môn), khối lớp, thời gian/câu, tổng số câu giới hạn và số học sinh. Có thể bật chế độ 4 vòng thi ở cuối trang này." },
      { icon:"🎯", title:"Chế độ 4 vòng thi (mới)", body:"Bật toggle '🎯 Chế độ 4 vòng thi' → cấu hình riêng cho từng vòng: Khởi động (40s), Vượt chướng ngại vật (30s), Tăng tốc (20s), Về đích (15s). Mỗi vòng có số câu và thời gian riêng, tăng dần độ khó." },
      { icon:"2️⃣", title:"Bước 2 – Chọn câu hỏi", body:"Hệ thống hiển thị câu hỏi phù hợp môn/lớp, nhóm theo bài. Tích từng câu hoặc nhóm bài. Nút '🎲 Chọn ngẫu nhiên X câu' xuất hiện nếu đặt giới hạn số câu. Nút '✨ AI sinh câu hỏi' cho phép sinh thêm câu ngay tại đây và tự động tick vào pool." },
      { icon:"3️⃣", title:"Bước 3 – Xác nhận & Tạo", body:"Xem tóm tắt: tên, môn, lớp, số câu, phân bổ theo môn, cấu trúc 4 vòng (nếu bật). Nhấn 'Tạo cuộc thi' → cuộc thi xuất hiện ngay trong trang Rung Chuông Vàng." },
      { icon:"🏫", title:"Chế độ Theo lớp", body:"Nhập danh sách các lớp tham gia (7A1, 7A2...) hoặc dùng nút điền nhanh theo khối. Trong buổi thi, giáo viên tích chọn lớp thực tế có mặt." },
    ]
  },
  {
    id:"game", icon:"🎯", color:"#DC2626", bg:"#FEE2E2",
    title:"Tổ chức cuộc thi",
    desc:"Quy trình đầy đủ từ màn hình chào đến lúc vinh danh người thắng. Giáo viên kiểm soát hoàn toàn nhịp thi.",
    steps:[
      { icon:"▶️", title:"Khởi động & Màn hình chào", body:"Nhấn 'Bắt đầu thi' → màn hình splash xuất hiện với nhạc nền, pháo giấy, thông tin cuộc thi và đếm ngược. Có thể bấm 'Bỏ qua →' để vào ngay. Nút 🎵 tắt/bật nhạc nền." },
      { icon:"👥", title:"Nhập thí sinh", body:"Cá nhân: nhập số đeo mỗi dòng hoặc nhấn '⚡ Tạo X HS tự động'. Theo lớp: tích lớp có mặt (cần ≥ 2 lớp). Bảng thí sinh hiển thị dạng lưới 2 cột gọn hơn." },
      { icon:"🏁", title:"Màn hình chuyển vòng (chế độ 4 vòng)", body:"Khi vào mỗi vòng, xuất hiện màn hình hoành tráng: nền đổi màu theo vòng, tên vòng to, emoji, tia sáng, pháo giấy, đếm ngược 5s. Bấm 'Vào Vòng X ngay!' để bỏ qua đếm ngược." },
      { icon:"❓", title:"Tiến hành thi", body:"Đọc câu hỏi cho học sinh. Đồng hồ đếm ngược tự động. Khi hết giờ, xuất hiện thông báo '⏰ Hết giờ!' — nhưng đáp án KHÔNG tự hiện. Giáo viên chủ động nhấn 'Hiện đáp án đúng' khi sẵn sàng." },
      { icon:"👆", title:"Chấm điểm", body:"Sau khi hiện đáp án: nhấn vào tên HS/lớp trả lời SAI → ô chuyển đỏ. Hoặc nhấn '🎲 Ngẫu nhiên' để mô phỏng kết quả. Nhấn 'Xác nhận kết quả' → HS bị đánh dấu bị loại chính thức." },
      { icon:"⚡", title:"Câu phụ AI – tăng độ khó tự động", body:"Khi hết câu chính mà còn nhiều HS: nút '✨ Câu phụ #N · [Độ khó]' xuất hiện. Độ khó tăng theo lượt: #1–2 = Trung bình, #3–4 = Khó, #5+ = Rất khó. Khi còn 2 người luôn là Rất khó." },
      { icon:"🔄", title:"Xử lý khi tất cả bị loại cùng lúc", body:"Nếu câu hỏi loại hết tất cả cùng lúc → hộp thoại xuất hiện với 4 lựa chọn: (1) Phục hồi người vừa bị loại + tiếp tục, (2) Phục hồi tất cả + làm lại câu, (3) Phục hồi + dùng câu phụ AI ngay, (4) Kết thúc không có người thắng." },
      { icon:"📋", title:"Hướng dẫn trong lúc thi", body:"Nhấn nút '📋 Hướng dẫn' trên topbar → panel nổi hiện 9 bước quy trình. Bước đang thực hiện tự động highlight vàng để giáo viên biết đang ở đâu." },
      { icon:"🏆", title:"Vinh danh người thắng", body:"Khi còn 1 HS/lớp → màn hình chiến thắng hoành tráng: vương minh 👑, confetti, pháo giấy, tên vàng lung linh, fanfare âm nhạc và thống kê toàn bộ cuộc thi." },
    ]
  },
  {
    id:"ai", icon:"✨", color:"#059669", bg:"#D1FAE5",
    title:"AI sinh câu hỏi",
    desc:"2 chế độ sinh câu hỏi: Tạo nhanh tổng hợp và Chi tiết theo bài. Hỗ trợ 10 môn học, 4 khối lớp, tích hợp địa phương 34 tỉnh/thành.",
    steps:[
      { icon:"⚡", title:"Tab Tạo nhanh – không cần chọn bài", body:"Chọn lớp → tick các môn (tích nhiều môn được) → nhập tổng số câu (preset: 6/8/10/12/15/20/25/30) → nhấn Tạo. AI tự phân bổ đều câu theo môn và cân bằng 40% Dễ · 40% TB · 20% Khó. Xem 'Kế hoạch dự kiến' trước khi sinh." },
      { icon:"📚", title:"Tab Chi tiết – chọn bài cụ thể", body:"Chọn môn → chọn lớp → tick bài học (có thể tick nhiều bài) → chọn số câu và độ khó → Sinh. AI phân bổ đều câu cho các bài đã tick. Nút 'Tất cả' tích toàn bộ bài trong môn." },
      { icon:"🏡", title:"Tích hợp địa phương – bật toggle", body:"Bật toggle '🏡 Tích hợp yếu tố địa phương' (phía dưới danh sách bài) → chọn tỉnh/thành và chủ đề → nút sinh đổi thành 'Sinh X câu (SGK + Tỉnh)'. AI lồng ≥50% câu có yếu tố địa phương thực tế." },
      { icon:"🔒", title:"Khóa môn/lớp khi mở từ Tạo cuộc thi", body:"Khi nhấn '✨ AI sinh câu hỏi' trong Bước 2 tạo cuộc thi, môn và lớp đã được khóa theo thông tin cuộc thi. Dropdown chỉ hiện các môn/lớp đã chọn. Câu được tự động tick vào pool cuộc thi." },
      { icon:"🌐", title:"Tiếng Anh – Global Success", body:"Danh sách bài đúng theo Global Success: 12 units/khối + 4 Reviews. Mỗi unit có đủ tiết: Getting started, A closer look 1/2, Communication, Skills 1/2, Looking back & Project." },
      { icon:"🔍", title:"Xem trước & chọn lọc câu", body:"Mỗi câu hiển thị đủ 4 đáp án, đáp án đúng tô vàng, tag môn/độ khó/bài học. Tích chọn câu muốn giữ, bỏ câu không phù hợp. Sau khi thêm vào ngân hàng, có thể gán thẳng vào cuộc thi." },
    ]
  },
  {
    id:"rounds", icon:"🎯", color:"#F59E0B", bg:"#FEF3C7",
    title:"Chế độ 4 vòng thi",
    desc:"Tổ chức thi theo 4 vòng có tên gọi, màu sắc và thời gian riêng – tạo không khí hồi hộp, kịch tính cho buổi thi.",
    steps:[
      { icon:"🚀", title:"Vòng 1 – Khởi động", body:"Câu hỏi nhận biết, ôn tập kiến thức cơ bản. Mặc định 5 câu · 40 giây/câu. Nền màu xanh lá." },
      { icon:"⚡", title:"Vòng 2 – Vượt chướng ngại vật", body:"Câu hỏi vận dụng, tư duy và phân tích. Mặc định 5 câu · 30 giây/câu. Nền màu vàng cam." },
      { icon:"🔥", title:"Vòng 3 – Tăng tốc", body:"Câu hỏi khó hơn, đòi hỏi suy luận nhanh. Mặc định 5 câu · 20 giây/câu. Nền màu đỏ." },
      { icon:"🏆", title:"Vòng 4 – Về đích", body:"Câu hỏi tổng hợp cuối để chọn người chiến thắng. Mặc định 3 câu · 15 giây/câu. Nền màu navy vàng." },
      { icon:"🎨", title:"Hiệu ứng chuyển vòng", body:"Giữa mỗi vòng là màn hình chuyển tiếp hoành tráng: nền đổi màu theo vòng, tên vòng to 54px, tia sáng, confetti màu, dấu ✦ nhấp nháy, mini-map tiến trình 4 vòng, đếm ngược 5s kèm âm thanh tăng dần." },
      { icon:"⚙️", title:"Tùy chỉnh từng vòng", body:"Khi tạo cuộc thi, bật toggle '🎯 Chế độ 4 vòng thi' → mỗi vòng có preset nhanh (2/3/4/5/6/8/10 câu) và nhập tay số câu + thời gian. Thanh tóm tắt hiện tổng câu toàn cuộc thi." },
      { icon:"🔁", title:"Câu hỏi xáo trộn tự động", body:"Toàn bộ câu hỏi trong pool được xáo trộn ngẫu nhiên (Fisher-Yates) khi bắt đầu thi, sau đó chia đều cho các vòng theo số lượng đã cài đặt." },
    ]
  },
  {
    id:"settings", icon:"⚙️", color:"#64748B", bg:"#F1F5F9",
    title:"Cài đặt & Sao lưu",
    desc:"Cá nhân hóa ứng dụng và bảo vệ dữ liệu của bạn.",
    steps:[
      { icon:"🏫", title:"Tab Trường học", body:"Cập nhật tên trường, loại trường, phường/xã và tỉnh/thành phố. Thay logo bằng 12 emoji có sẵn. Thông tin hiển thị trên sidebar và màn hình thi." },
      { icon:"🎨", title:"Tuỳ chỉnh giao diện", body:"Chọn 1 trong 6 chủ đề màu sắc. Điều chỉnh cỡ chữ từ 13–17px bằng thanh kéo hoặc chip preset. Cài đặt lưu tự động và giữ nguyên sau khi tải lại trang." },
      { icon:"💾", title:"Sao lưu dữ liệu", body:"Nhấn 'Xuất file sao lưu' để tải file .json chứa toàn bộ câu hỏi, cuộc thi, lịch sử. Lưu file này thường xuyên, đặc biệt sau khi tạo nhiều câu hỏi bằng AI." },
      { icon:"📂", title:"Khôi phục dữ liệu", body:"Nhấn 'Nhập file khôi phục' → chọn file .json đã sao lưu → dữ liệu được khôi phục hoàn toàn bao gồm câu hỏi, cuộc thi và lịch sử." },
      { icon:"🗑️", title:"Xóa & reset mặc định", body:"Xóa toàn bộ dữ liệu và trở về trạng thái ban đầu. Không thể hoàn tác. Nên xuất sao lưu trước khi thực hiện." },
    ]
  },
  {
    id:"tips", icon:"💡", color:"#D97706", bg:"#FEF3C7",
    title:"Mẹo & Lưu ý",
    desc:"Kinh nghiệm giúp tổ chức buổi thi Rung Chuông Vàng chuyên nghiệp và hiệu quả nhất.",
    steps:[
      { icon:"🎯", title:"Chuẩn bị câu hỏi trước", body:"Dùng 'AI tạo nhanh' với 20–30 câu tổng hợp nhiều môn để có sẵn ngân hàng. Hoặc dùng 'Chi tiết theo bài' để bám sát bài đang giảng. Câu được xáo trộn tự động khi thi." },
      { icon:"🏁", title:"Dùng chế độ 4 vòng", body:"Với lớp 30–40 HS, dùng 4 vòng (5+5+5+3 = 18 câu) tạo nhịp thi tốt hơn. Vòng 1–2 loại dần, vòng 3–4 phân định những HS giỏi nhất." },
      { icon:"⏱️", title:"Giáo viên quyết định khi hiện đáp án", body:"Hết giờ chỉ hiện thông báo, không tự mở đáp án. Giáo viên quan sát HS giơ bảng xong rồi mới nhấn 'Hiện đáp án đúng'. Điều này tránh HS chép nhau theo màn hình." },
      { icon:"📱", title:"Chiếu màn hình", body:"Chiếu qua máy chiếu hoặc TV. Màn hình thi tối ưu cho 1920×1080. Câu hỏi và đáp án hiển thị cỡ chữ lớn. Bảng thí sinh hiển thị lưới 2 cột tiết kiệm chỗ." },
      { icon:"🔄", title:"Xử lý tình huống bất ngờ", body:"Tất cả bị loại cùng lúc → hộp thoại 4 lựa chọn xuất hiện. Hết câu còn nhiều HS → dùng câu phụ AI tăng độ khó từng bước. Ứng dụng không bao giờ tự kết thúc giữa chừng." },
      { icon:"🔊", title:"Âm thanh và nhạc nền", body:"Bật âm thanh trình duyệt để có beep đếm ngược 5s cuối mỗi câu (tăng dần cao độ), fanfare chiến thắng và nhạc nền trong khi thi. Nút 🎵 tắt/bật nhạc bất cứ lúc nào." },
      { icon:"🤖", title:"Tối ưu AI địa phương", body:"Tích hợp địa phương hiệu quả nhất với môn KHTN (liên hệ sinh vật, địa hình), Lịch sử & Địa lí (sự kiện, địa danh) và GD địa phương. Chọn đúng tỉnh (34 đơn vị mới sau 1/7/2025)." },
      { icon:"📊", title:"Theo dõi lịch sử", body:"Mỗi cuộc thi được lưu kết quả: ngày tổ chức, số câu đã thi, người thắng, diễn biến chi tiết. Vào Lịch sử để xem thống kê và xuất báo cáo." },
    ]
  },
];

function GuidePage({ navigate }) {
  const [active, setActive] = useState("overview");
  const section = GUIDE_SECTIONS.find(s => s.id === active);

  return (
    <div className="page-in" style={{ maxWidth: 1000 }}>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:21, fontWeight:900, color:"#1E293B", marginBottom:3 }}>❓ Hướng dẫn sử dụng</h1>
        <p style={{ color:"#94A3B8", fontSize:13.5 }}>Hướng dẫn chi tiết từng bước sử dụng Rung Chuông Vàng</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:16, alignItems:"start" }}>
        {/* Sidebar nav */}
        <div className="card" style={{ padding:"10px 8px", position:"sticky", top:0 }}>
          {GUIDE_SECTIONS.map(s => (
            <div key={s.id}
              onClick={() => setActive(s.id)}
              style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 10px", borderRadius:9, cursor:"pointer",
                background: active===s.id ? s.bg : "transparent",
                color: active===s.id ? "#1E293B" : "#64748B",
                fontWeight: active===s.id ? 700 : 500,
                fontSize:13.5, marginBottom:2, transition:"all .14s",
                borderLeft: active===s.id ? `3px solid ${s.color}` : "3px solid transparent",
              }}>
              <span style={{fontSize:15, flexShrink:0}}>{s.icon}</span>
              <span style={{lineHeight:1.3}}>{s.title}</span>
            </div>
          ))}
          <div style={{ borderTop:"1px solid #F1F5F9", marginTop:10, paddingTop:10 }}>
            <div onClick={() => navigate("questions")}
              style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:9, cursor:"pointer", color:"#D97706", fontWeight:700, fontSize:13, background:"#FFFBEB" }}>
              <span>🚀</span> Bắt đầu ngay
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Section header */}
          <div className="card" style={{ padding:"20px 22px", marginBottom:14, background:`linear-gradient(135deg,${section.bg},#fff)`, borderColor:section.color+"44" }}>
            <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
              <div style={{ width:52, height:52, borderRadius:14, background:section.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0, boxShadow:`0 4px 14px ${section.color}44` }}>
                {section.icon}
              </div>
              <div>
                <h2 style={{ fontSize:17, fontWeight:900, color:"#1E293B", marginBottom:5 }}>{section.title}</h2>
                <p style={{ fontSize:13.5, color:"#64748B", lineHeight:1.6 }}>{section.desc}</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {section.steps.map((step, i) => (
              <div key={i} className="card" style={{ padding:"16px 18px", display:"flex", gap:14, alignItems:"flex-start" }}>
                {/* Step number + icon */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5, flexShrink:0 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:section.bg, border:`2px solid ${section.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
                    {step.icon}
                  </div>
                  <div style={{ width:22, height:22, borderRadius:50, background:section.color, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900 }}>
                    {i+1}
                  </div>
                </div>
                {/* Content */}
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800, color:"#1E293B", fontSize:14.5, marginBottom:5 }}>{step.title}</div>
                  <div style={{ fontSize:13.5, color:"#475569", lineHeight:1.7 }}>{step.body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation between sections */}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:16 }}>
            {(() => {
              const idx = GUIDE_SECTIONS.findIndex(s=>s.id===active);
              const prev = GUIDE_SECTIONS[idx-1];
              const next = GUIDE_SECTIONS[idx+1];
              return (
                <>
                  {prev ? (
                    <button className="btn btn-g btn-sm" onClick={() => setActive(prev.id)}>
                      ← {prev.icon} {prev.title}
                    </button>
                  ) : <div/>}
                  {next ? (
                    <button className="btn btn-p btn-sm" onClick={() => setActive(next.id)}>
                      {next.icon} {next.title} →
                    </button>
                  ) : (
                    <button className="btn btn-p btn-sm" onClick={() => navigate("dashboard")}>
                      🏠 Về Tổng quan
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────── ROOT ────────────
// ─────────── WELCOME SCREEN ────────────
function WelcomeScreen({ onEnter, schoolInfo }) {
  const [step, setStep] = useState(0); // 0=intro, 1=fadeout

  const particles = useRef(Array.from({length:20},(_,i)=>({
    left: Math.random()*100, top: Math.random()*100,
    size: 2+Math.random()*5,
    color: ["#FBBF24","rgba(255,255,255,.5)","rgba(251,191,36,.6)"][i%3],
    dur: 5+Math.random()*5, delay: Math.random()*5,
  }))).current;

  const rays = useRef(Array.from({length:6},(_,i)=>({
    angle: i*60, len: 30+Math.random()*20,
    opacity: 0.05+Math.random()*0.07, delay: i*0.2,
  }))).current;

  const enter = () => {
    setStep(1);
    localStorage.setItem("rcv_welcomed","1");
    setTimeout(onEnter, 600);
  };

  const features = [
    "🎯 4 vòng thi kịch tính", "✨ AI sinh câu hỏi", "🏡 Tích hợp địa phương",
    "⚡ Câu phụ leo thang độ khó", "🏆 Vinh danh hoành tráng", "📊 Ngân hàng câu hỏi",
  ];

  return (
    <div className="wl" style={{ opacity: step===1?0:1, transition:"opacity .6s ease" }}>

      {/* ── Background particles ── */}
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
        {particles.map((p,i)=>(
          <div key={i} className="wl-particle" style={{
            left:`${p.left}%`, top:`${p.top}%`,
            width:p.size, height:p.size, background:p.color,
            animation:`confettiFall ${p.dur}s linear ${p.delay}s infinite`,
          }}/>
        ))}

        {/* Rays */}
        {rays.map((r,i)=>(
          <div key={`r${i}`} className="wl-ray" style={{
            height:`${r.len}vh`, marginLeft:-1,
            background:`linear-gradient(0deg,rgba(251,191,36,${r.opacity}),transparent)`,
            transform:`rotate(${r.angle}deg)`,
            animation:`rayPulse ${3+i*.2}s ease-in-out ${r.delay}s infinite`,
          }}/>
        ))}

        {/* Glow orbs */}
        {[
          {x:15,y:25,s:350,c:"rgba(251,191,36,.05)"},
          {x:85,y:70,s:400,c:"rgba(96,165,250,.04)"},
        ].map((o,i)=>(
          <div key={`o${i}`} style={{position:"absolute",left:`${o.x}%`,top:`${o.y}%`,
            width:o.s,height:o.s,borderRadius:"50%",background:o.c,
            transform:"translate(-50%,-50%)",filter:"blur(60px)",
          }}/>
        ))}

        {/* Stars */}
        {["✦","✧","✦","✧","✦"].map((s,i)=>(
          <div key={`s${i}`} style={{
            position:"absolute", left:`${10+i*18}%`, top:`${20+Math.sin(i)*15}%`,
            fontSize:10+i%2*8, color:"rgba(251,191,36,.2)",
            animation:`twinkle ${2+i*.6}s ease-in-out ${i*.5}s infinite`
          }}>{s}</div>
        ))}
      </div>

      {/* ── Gold rings ── */}
      {[120,220,340].map((s,i)=>(
        <div key={i} className="gold-ring" style={{width:s,height:s,animationDelay:`${i*.5}s`}}/>
      ))}

      {/* ── Main card ── */}
      <div className="wl-card">

        {/* Bell icon */}
        <div style={{
          fontSize:88, lineHeight:1, marginBottom:16,
          filter:"drop-shadow(0 0 50px rgba(251,191,36,.7))",
          animation:"wlFloat 3s ease-in-out infinite",
        }}>🔔</div>

        {/* Title */}
        <div className="wl-title">Rung Chuông Vàng</div>

        {/* Subtitle */}
        <div className="wl-sub">
          Nền tảng tổ chức thi trắc nghiệm thông minh<br/>
          cho học sinh Trung học Cơ sở
        </div>

        {/* Feature pills */}
        <div className="wl-features">
          {features.map(f=>(
            <div key={f} className="wl-feat">{f}</div>
          ))}
        </div>

        {/* Enter button */}
        <button className="wl-btn" onClick={enter}>
          Bắt đầu sử dụng →
        </button>

        <div className="wl-hint">
          Phát triển bởi Cô Huỳnh Thị Thùy Dương · THCS Lý Tự Trọng · Tây Ninh
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  // Show welcome only on first ever visit
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem("rcv_welcomed"));
  const [questions, setQuestions]   = useState(() => lsLoad()?.questions   || INITIAL_QUESTIONS);
  const [contests,  setContests]    = useState(() => lsLoad()?.contests    || INITIAL_CONTESTS);
  const [history,   setHistory]     = useState(() => lsLoad()?.history     || HISTORY);
  const [schoolInfo, setSchoolInfo] = useState(() => lsLoad()?.schoolInfo  || INITIAL_SCHOOL_INFO);
  const [soundOn, setSoundOn]       = useState(() => lsLoad()?.soundOn !== false);
  const [themeId, setThemeId]       = useState(() => lsLoad()?.themeId    || "gold");
  const [fontSize, setFontSize]     = useState(() => lsLoad()?.fontSize   || 15);
  const [activeGame, setActiveGame] = useState(null);

  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];

  // ── Auto-save to localStorage whenever data changes ──
  useEffect(() => {
    lsSave({ questions, contests, history, schoolInfo, soundOn, themeId, fontSize });
  }, [questions, contests, history, schoolInfo, soundOn, themeId, fontSize]);

  // ── Apply font size ──
  useEffect(() => {
    document.documentElement.style.fontSize = fontSize + "px";
    return () => { document.documentElement.style.fontSize = "15px"; };
  }, [fontSize]);

  const startGame = c => setActiveGame(c);

  const endGame = (result) => {
    if (result && activeGame) {
      setHistory(prev => [...prev, {
        id: Date.now(),
        name: activeGame.name,
        subjects: activeGame.subjects || [activeGame.subject],
        subject: (activeGame.subjects||[activeGame.subject])[0],
        grade: activeGame.grade,
        createdAt: new Date().toISOString().slice(0, 10),
        players: result.players,
        winner: result.winner,
        questionsPlayed: result.questionsPlayed,
        eliminated: result.eliminated,
        status: "Đã kết thúc",
      }]);
    }
    setActiveGame(null);
    setPage("history");
  };

  if (activeGame) return (<><style>{CSS}</style><style>{genThemeCSS(theme)}</style><GameScreen contest={activeGame} questions={questions} onEnd={endGame} soundOn={soundOn} /></>);

  if (showWelcome) return (
    <>
      <style>{CSS}</style>
      <WelcomeScreen onEnter={() => setShowWelcome(false)} schoolInfo={schoolInfo} />
    </>
  );

  const NAV = [
    { id: "dashboard", l: "Tổng quan", ico: <Ic.Home /> },
    { id: "game", l: "Rung Chuông Vàng", ico: <Ic.Bell /> },
    { id: "questions", l: "Ngân hàng câu hỏi", ico: <Ic.Book /> },
    { id: "create", l: "Tạo cuộc thi", ico: <Ic.Plus /> },
    { id: "history", l: "Lịch sử cuộc thi", ico: <Ic.Hist /> },
    { id: "settings", l: "Cài đặt", ico: <Ic.Cog /> },
    { id: "guide", l: "Hướng dẫn sử dụng", ico: <Ic.Guide /> },
  ];
  const props = { questions, setQuestions, contests, setContests, history, setHistory, navigate: setPage, onStartGame: startGame, schoolInfo, setSchoolInfo, soundOn, setSoundOn };
  const PAGES = {
    dashboard: <Dashboard {...props} />,
    game: <RCVPage {...props} />,
    questions: <QuestionBank {...props} />,
    create: <CreateContest {...props} />,
    history: <HistoryPage {...props} />,
    settings: <SettingsPage schoolInfo={schoolInfo} setSchoolInfo={setSchoolInfo} soundOn={soundOn} setSoundOn={setSoundOn} themeId={themeId} setThemeId={setThemeId} fontSize={fontSize} setFontSize={setFontSize} allData={{questions,contests,history,schoolInfo}} setAllData={(d)=>{setQuestions(d.questions||INITIAL_QUESTIONS);setContests(d.contests||INITIAL_CONTESTS);setHistory(d.history||[]);setSchoolInfo(d.schoolInfo||INITIAL_SCHOOL_INFO);}} setShowWelcome={setShowWelcome} />,
    guide: <GuidePage navigate={setPage} />,
  };

  return (
    <>
      <style>{CSS}</style>
      <style>{genThemeCSS(theme)}</style>
      <div className="shell">
        <aside className="sb">
          <div className="sb-logo">
            <div className="sb-ico">{schoolInfo.logo}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: "#1E3A5F", lineHeight: 1.2 }}>{schoolInfo.schoolType}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#D97706", lineHeight: 1.3 }}>{schoolInfo.schoolName}</div>
            </div>
          </div>
          <nav style={{ padding: "10px 8px", flex: 1 }}>
            {NAV.map(item => (
              <div key={item.id} className={`nav-item ${page === item.id ? "on" : ""}`} onClick={() => setPage(item.id)}>
                {item.ico}<span>{item.l}</span>
                {item.id === "game" && contests.length > 0 && (page === item.id ? <span className="nb">{contests.length}</span> : <span className="nb-off">{contests.length}</span>)}
                {item.id === "history" && history.length > 0 && page !== item.id && <span className="nb-off">{history.length}</span>}
              </div>
            ))}
          </nav>
          <div className="sb-ft">
            <div className="sb-teacher">
              <div style={{ fontSize: 10.5, fontWeight: 800, color: "#92400E", marginBottom: 4, letterSpacing: 0.3 }}>👩‍🏫 Người phát triển</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: "#78350F", lineHeight: 1.35, marginBottom: 2 }}>Cô Huỳnh Thị Thùy Dương</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400E", marginBottom: 4 }}>Giáo viên KHTN</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#047857", background: "#D1FAE5", borderRadius: 100, padding: "2px 8px", display: "inline-block", marginBottom: 5 }}>✦ Gemini Educator</div>
              <div style={{ fontSize: 10.5, color: "#92400E", lineHeight: 1.7 }}>
                <div>🏫 Trường THCS Lý Tự Trọng</div>
                <div style={{ paddingLeft: 14 }}>Phường Long Hoa – Tây Ninh</div>
                <div>📞 0976793038</div>
              </div>
            </div>
          </div>
        </aside>
        <div className="mw">
          <header className="tb">
            <div className="tb-title">{NAV.find(n => n.id === page)?.ico}{NAV.find(n => n.id === page)?.l}</div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              {/* Quick theme switcher */}
              <div style={{ display:"flex", gap:4, background:"#F1F5F9", borderRadius:9, padding:"3px" }}>
                {THEMES.map(t => (
                  <div key={t.id} title={t.name}
                    onClick={() => setThemeId(t.id)}
                    style={{ width:22, height:22, borderRadius:6, background:`linear-gradient(135deg,${t.p1},${t.p2})`, cursor:"pointer", border: themeId===t.id ? `2px solid ${t.dark}` : "2px solid transparent", transition:"all .14s", flexShrink:0 }} />
                ))}
              </div>
              <div className="tb-date">📅 {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}</div>
            </div>
          </header>
          <main className="pb">{PAGES[page] || PAGES.dashboard}</main>
        </div>
      </div>
    </>
  );
}
