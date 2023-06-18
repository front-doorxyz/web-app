import create from "zustand";
import { JobListing } from "./model";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */


type TGlobalState = {
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;

};

export const useGlobalState = create<TGlobalState>(set => ({
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),
}));

const database = {
    'KqgNu28QeaWfrTp9MjhM4SGtd8ePSiD8wqWmjdwXqyNg0sAXRhQpGIIautVWBfgs': {
      id: 'KqgNu28QeaWfrTp9MjhM4SGtd8ePSiD8wqWmjdwXqyNg0sAXRhQpGIIautVWBfgs',
      roleTitle: "Software Engineer",
      description: "Develop and maintain software applications",
      location: "Remote",
      maxSalary: 150000,
      minSalary: 100000,
      bounty: 5000,
      companyName: "Tech Corp"
    },
    'jepJ74p9tayS1Z22YQP9qb3UphMDqZbmhMNw3b66bQk2GiPQHHOEzuTGpQ9OEafV': {
      id: 'jepJ74p9tayS1Z22YQP9qb3UphMDqZbmhMNw3b66bQk2GiPQHHOEzuTGpQ9OEafV',
      roleTitle: "Data Scientist",
      description: "Analyze and interpret complex data",
      location: "New York",
      maxSalary: 180000,
      minSalary: 120000,
      bounty: 7000,
      companyName: "Data Analytics Inc"
    },
    'OkDRlVJl0tkptDRDgiMHIhNP44nRZ2KzReYM9hToPt3XnjlNC9A3jrY2yWqwsafX': {
      id: 'OkDRlVJl0tkptDRDgiMHIhNP44nRZ2KzReYM9hToPt3XnjlNC9A3jrY2yWqwsafX',
      roleTitle: "Product Manager",
      description: "Drive product development and strategy",
      location: "San Francisco",
      maxSalary: 200000,
      minSalary: 140000,
      bounty: 8000,
      companyName: "Products Co"
    }

}

function mockid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}



export async function createJobListing (jobListing: JobListing): Promise<JobListing> {
  let id = mockid(64);
  jobListing.id = id;
  database[id] = jobListing;
  console.log('JobListing added with id:', id)
  return jobListing;
}

export async function readJobListingById (id: string): Promise<JobListing> {
    return database[id];
}

export async function readAllJobListings (): Promise<JobListing[]> {
  return Object.values(database)
}

export async function jobUpdate(id: string, updatedJob: Partial<JobListing>): Promise<JobListing | undefined> {
  const job = database[id];
  if (job) {
    const updatedJobListing = { ...job, ...updatedJob };
    database[id] = updatedJobListing;
    console.log('JobListing updated with id:', id);
    return updatedJobListing;
  }
  return undefined;
}


// readAllJobListings().then((listings) => {  console.log('Reading completed', listings);}).catch((error) => {console.log('Error during reading:', error);});
