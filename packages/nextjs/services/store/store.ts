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

let database = {}

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


function mockDatabase () {
  const mockJobListings: JobListing[] = [
    {
      roleTitle: "Software Engineer",
      description: "Develop and maintain software applications",
      location: "Remote",
      maxSalary: 150000,
      minSalary: 100000,
      bounty: 5000,
      companyName: "Tech Corp"
    },
    {
      roleTitle: "Data Scientist",
      description: "Analyze and interpret complex data",
      location: "New York",
      maxSalary: 180000,
      minSalary: 120000,
      bounty: 7000,
      companyName: "Data Analytics Inc"
    },
    {
      roleTitle: "Product Manager",
      description: "Drive product development and strategy",
      location: "San Francisco",
      maxSalary: 200000,
      minSalary: 140000,
      bounty: 8000,
      companyName: "Products Co"
    }
  ];

  mockJobListings.forEach(async jobListing => {
    await create(jobListing);
  });
}


async function create (jobListing: JobListing): Promise<JobListing> {
  let id = mockid(64);
  jobListing.id = id;

  database[id] = jobListing;

  console.log('Content added with id:', id)
  return jobListing;
}

async function readById (id: string): Promise<JobListing> {
    return database[id];
}

async function readAll(): Promise<JobListing[]> {
  return Object.values(database)
}


mockDatabase();
