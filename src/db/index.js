import Dexie from 'dexie';
import FormJobApplication from "../forms/job-application.json"
import FormJob from "../forms/job-upsert.json"
export const db = new Dexie('frontDoor');
db.version(12).stores({
  user: '++id, email, web3Address, online',
  jobApplications: '++id,' + FormJobApplication.fields.map(item=> item.key).join(","),
  myJobs: '++id,' + FormJob.fields.map(item=> item.key).join(","),
});