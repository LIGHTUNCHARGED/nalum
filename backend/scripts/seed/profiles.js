/**
 * Profiles collection — seed data and loader.
 * Depends on users.js having already run (looks users up by email).
 * Location data sourced from the existing scripts/add_sample_locations.js.
 */

const User = require('../../models/user/user.model');
const Profile = require('../../models/user/profile.model');
const { alumniData, studentData } = require('./users');

const sampleLocations = [
  // Indian cities
  { city: 'delhi', country: 'india', lat: 28.6139, lng: 77.209 },
  { city: 'mumbai', country: 'india', lat: 19.076, lng: 72.8777 },
  { city: 'bangalore', country: 'india', lat: 12.9716, lng: 77.5946 },
  { city: 'pune', country: 'india', lat: 18.5204, lng: 73.8567 },
  { city: 'hyderabad', country: 'india', lat: 17.385, lng: 78.4867 },
  { city: 'chennai', country: 'india', lat: 13.0827, lng: 80.2707 },
  { city: 'kolkata', country: 'india', lat: 22.5726, lng: 88.3639 },
  // International cities
  { city: 'new york', country: 'united states', lat: 40.7128, lng: -74.006 },
  { city: 'london', country: 'united kingdom', lat: 51.5074, lng: -0.1278 },
  { city: 'singapore', country: 'singapore', lat: 1.3521, lng: 103.8198 },
  { city: 'dubai', country: 'united arab emirates', lat: 25.2048, lng: 55.2708 },
  { city: 'san francisco', country: 'united states', lat: 37.7749, lng: -122.4194 },
  { city: 'toronto', country: 'canada', lat: 43.6532, lng: -79.3832 },
  { city: 'sydney', country: 'australia', lat: -33.8688, lng: 151.2093 },
  { city: 'berlin', country: 'germany', lat: 52.52, lng: 13.405 },
  // More Indian cities
  { city: 'ahmedabad', country: 'india', lat: 23.0225, lng: 72.5714 },
  { city: 'jaipur', country: 'india', lat: 26.9124, lng: 75.7873 },
];

async function seedProfiles() {
  // Explicit location indices matching alumniData order for deliberate clustering:
  // 0,1,2 → Delhi | 3,4,5 → Mumbai | 6,7,8,9 → Bangalore | 10,11 → Pune |
  // 12 → Hyderabad | 13 → Chennai | 14 → Kolkata | 15,16 → New York |
  // 17,18 → London | 19 → Singapore | 20 → Dubai | 21,22 → San Francisco |
  // 23 → Toronto | 24 → Sydney | 25 → Berlin | 26 → Ahmedabad | 27 → Jaipur
  const alumniLocationIndices = [
    0, 0, 0,       // Delhi (3)
    1, 1, 1,       // Mumbai (3)
    2, 2, 2, 2,    // Bangalore (4)
    3, 3,          // Pune (2)
    4,             // Hyderabad (1)
    5,             // Chennai (1)
    6,             // Kolkata (1)
    7, 7,          // New York (2)
    8, 8,          // London (2)
    9,             // Singapore (1)
    10,            // Dubai (1)
    11, 11,        // San Francisco (2)
    12,            // Toronto (1)
    13,            // Sydney (1)
    14,            // Berlin (1)
    15,            // Ahmedabad (1)
    16,            // Jaipur (1)
  ];

  // Alumni profiles — assign locations using the explicit index map.
  for (let i = 0; i < alumniData.length; i++) {
    const a = alumniData[i];
    const user = await User.findOne({ email: a.email });
    if (!user) {
      console.log(`⚠️  no user for ${a.email}, skipping profile`);
      continue;
    }
    const existing = await Profile.findOne({ user: user._id });
    if (existing) {
      console.log(`⚠️  profile for ${a.email} already exists, skipping`);
      continue;
    }
    const locIndex = alumniLocationIndices[i] ?? i % sampleLocations.length;
    const loc = sampleLocations[locIndex];
    await Profile.create({
      user: user._id,
      batch: a.batch,
      branch: a.branch,
      campus: a.campus,
      location: { city: loc.city, country: loc.country, lat: loc.lat, lng: loc.lng },
    });
    console.log(`✅ profile: ${a.email} @ ${loc.city}`);
  }

  // Student profiles — no location.
  for (const s of studentData) {
    const user = await User.findOne({ email: s.email });
    if (!user) {
      console.log(`⚠️  no user for ${s.email}, skipping profile`);
      continue;
    }
    const existing = await Profile.findOne({ user: user._id });
    if (existing) {
      console.log(`⚠️  profile for ${s.email} already exists, skipping`);
      continue;
    }
    await Profile.create({
      user: user._id,
      batch: s.batch,
      branch: s.branch,
      campus: s.campus,
    });
    console.log(`✅ profile: ${s.email}`);
  }

  // No profile created for the admin — intentional, see plan discussion.
}

module.exports = { seedProfiles, sampleLocations };
