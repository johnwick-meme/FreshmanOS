# FreshmanOS

> Your college. Your resources. Your community.

FreshmanOS is an open-source platform designed to help college freshmen navigate academics, campus life and student community.

## Features

- 📚 Academic Hub
- 🗺️ Campus Guide
- 👥 Student Hub
- 🎉 Events
- 🔍 Lost & Found
- 🆘 Help & Support

## Built By

A team of first-year CSE students.

## Academic Hub data (MVP)

Academic subjects and syllabus resource links are stored in `backend/data/subjects.json`. The existing API routes serve this data:

- `GET /api/subjects` — all subjects
- `GET /api/subjects/:id` — one subject by ID (for example `ma-111`)
- `GET /api/academic/:branch` — branch-specific course list from `course.json`

Each theory subject includes `semester`, `cycle`, `units`, `topics`, `youtube_links`, and optional `notes_pdf`. YouTube URLs currently point to topic searches; they are starter links, not individually verified playlists. Lab subjects are included, but their detailed experiment lists should be filled from the official lab syllabus. Check semester/unit details against the official syllabus before presenting this data as final.
