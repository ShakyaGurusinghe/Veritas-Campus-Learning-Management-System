const Lecture = require('../../models/Lecture');
const LectureTicket = require('../../models/Lecturesupportmodel');
//const Assignment =
//const Quiz =
const Schedule = require('../../models/Schedule');

exports.getDashboardData = async (req, res) => {
    try{
        const instructorId = req.user.id;
        
        const tickets = await LectureTicket.find({userId: instructorId});
        const lecture = await Lecture.find().limit(10);
        const schedule = await Schedule.findOne({instructor: instructorId});
        
        const enrolments = [
            {subject: 'Database Systems', count: 35},
            {subject: 'Image Understanding and Processing', count: 40}
        ];

        const submissions = assignements.map((a, i) => ({
            studentId: 'STD' + (1000 + i),
            subjectId: 'IT-' + (200 + i),
            assignments: a.title,
            submissionDate: new Date().toLocaleDateString(),
            submittedDate: new Date().toLocaleString(),
            fileUrl: a.uploadedFile || '#'
        }));

        res.json({
            tickets,
            lecture,
            enrolments,
            submissions,
            schedule
        });
        
    } catch (err) {
        res.status(500).json({message: 'Dashboard data fetch failed', error: err.message});
    }

    exports.getInstructorDashboardData = (req, res) => {
  res.json({
    schedule: {
      subjectCode: "SE4010",
      subject: "Software Engineering",
      time: "10:00 AM - 12:00 PM",
      location: "Room A203",
      status: "Ongoing"
    },
    enrolments: [
      { subject: "Software Engineering", count: 45 },
      { subject: "IUP", count: 40 }
    ],
    submissions: [
      {
        studentId: "IT20120001",
        subjectId: "SE4010",
        assignment: "Assignment 1",
        submissionDate: "2025-05-30 23:59",
        submittedDate: "2025-05-28 11:30",
        fileUrl: "/uploads/assignments/assignment1-it20120001.pdf"
      }
    ]
  });
};

};