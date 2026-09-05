import { getStore } from "@netlify/blobs";

const store = getStore("tsa-content");

const content = {
  news: {
    items: [
      {
        title: "2026/2027 academic year begins in September",
        date: "Aug 2026",
        category: "Announcements",
        excerpt: "Resumption date and term dates have been shared with parents; new pupils should complete admission by the last week of August."
      },
      {
        title: "Inter-house sports day held on campus",
        date: "Jun 2026",
        category: "Sports",
        excerpt: "Pupils from nursery through secondary competed across four houses, with the closing ceremony held in the school field."
      },
      {
        title: "Secondary pupils sit mock WAEC/NECO papers",
        date: "May 2026",
        category: "Academic",
        excerpt: "Mock exams were held ahead of this year's external examinations to prepare SS3 students."
      },
      {
        title: "Cultural Day celebration",
        date: "Mar 2026",
        category: "Events",
        excerpt: "Pupils celebrated Nigeria's rich cultural heritage with performances and exhibitions."
      },
      {
        title: "New term resumption notice",
        date: "Feb 2026",
        category: "Announcements",
        excerpt: "Parents and guardians are reminded of the new term resumption date and preparations for the academic term."
      }
    ]
  },

  gallery: {
    items: [
      { caption: "Main School Building", category: "campus", image: "" },
      { caption: "Our Campus", category: "campus", image: "" },
      { caption: "Students in Class", category: "academics", image: "" },
      { caption: "Graduation Ceremony", category: "events", image: "" },
      { caption: "Sports Day Activities", category: "sports", image: "" },
      { caption: "Cultural Festival", category: "events", image: "" },
      { caption: "School Library", category: "campus", image: "" },
      { caption: "Classroom Activities", category: "academics", image: "" },
      { caption: "Inter-School Football", category: "sports", image: "" },
      { caption: "Annual Prize-Giving Day", category: "events", image: "" }
    ]
  },

  fees: {
    creche: "₦ 10,000",
    nursery: "₦ 10,000",
    primary: "₦ 00,000",
    secondary: "₦ 00,000",
    bank_name: "[Bank name]",
    account_name: "Triumphant Standard Academy",
    account_number: "0000000000"
  }
};

export default async () => {
  await Promise.all([
    store.setJSON("news", content.news),
    store.setJSON("gallery", content.gallery),
    store.setJSON("fees", content.fees)
  ]);

  return new Response(
    JSON.stringify({
      success: true,
      message: "TSA content migrated successfully."
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
