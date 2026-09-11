'use client'

import { GenericServicePage } from './generic-service'

export default function MeetingRoomsPage() {
  return (
    <GenericServicePage
      config={{
        eyebrow: 'On-Demand Workspace',
        title: 'Meeting Room.',
        subtitle: 'An acoustically isolated meeting room equipped with 4K presentation display and video conferencing in Kisumu.',
        image: '/meeting-room.webp',
        imageAlt: 'Professional meeting room with 4K display and conference table',
        description:
          'From client presentations and team catch-ups to interviews and project reviews, the Paper Street meeting room gives you a quiet, professional environment equipped with presentation technology bookable by the hour.',
        audience: 'For consultants, remote teams, founders, and professionals who need a quiet, private meeting room on demand in Kisumu.',
        outcome: 'A professional, distraction-free meeting environment that leaves a strong impression on your clients and partners.',
        stats: [
          { value: '6–8 Pax', label: 'Room capacity' },
          { value: '4K UHD', label: 'Presentation display' },
          { value: 'Hourly', label: 'Flexible booking' },
        ],
        features: [
          {
            title: '4K Ultra-HD Presentation Display',
            desc: 'High-definition display with wireless screen sharing and HDMI/USB-C cables for seamless slide decks and video presentations.',
          },
          {
            title: 'Studio Video Conferencing System',
            desc: 'Wide-angle conference camera with beamforming microphone and speaker for clear Zoom, Google Meet, and Microsoft Teams calls.',
          },
          {
            title: 'Multi-Port Device Connectivity',
            desc: 'Universal HDMI, USB-C, and adapter hubs ready on the table for quick plug-and-play laptop connections.',
          },
          {
            title: 'High-Speed Redundant Wi-Fi',
            desc: 'Dependable internet connection ensuring smooth video calls, screen sharing, and cloud presentations.',
          },
          {
            title: 'Dry-Erase Glass Whiteboard',
            desc: 'Magnetic glass whiteboard with markers and supplies for collaborative strategy sessions and note-taking.',
          },
          {
            title: 'Ergonomic Executive Seating',
            desc: 'Comfortable ergonomic conference chairs and spacious meeting table designed for productive discussions.',
          },
          {
            title: 'Sound-Isolated Acoustic Privacy',
            desc: 'Acoustic wall isolation ensuring your meeting conversations and client discussions remain completely private.',
          },
          {
            title: 'Front Desk Greeting & Tech Support',
            desc: 'Our front-desk team welcomes your guests upon arrival and assists with getting your presentation display set up.',
          },
        ],
        detailsTitle: 'A meeting room ready when you need it.',
        detailsIntro: 'Skip noisy public spaces. Book our professional meeting room in Kisumu by the hour and run your meetings with confidence.',
        operational: [
          { label: 'Reserve your time slot', detail: 'Book by the hour directly through our client portal or by contacting reception.' },
          { label: 'Arrive and connect', detail: 'Our front desk welcomes your attendees, provides Wi-Fi access, and gets the presentation screen ready.' },
          { label: 'Focus on your meeting', detail: 'Enjoy a quiet, private setting with high-speed internet throughout your session.' },
        ],
      }}
    />
  )
}
