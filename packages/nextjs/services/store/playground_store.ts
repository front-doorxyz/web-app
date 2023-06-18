import {create} from "zustand";
import process from 'process'
import { Web3Storage, getFilesFromPath, Filelike } from 'web3.storage'
import { JobListing } from "./model";
import { File, Web3File, Web3FileOpts  } from 'web3-file';
import { Readable } from 'stream';

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */


let labels = {}
new ReadableStream()

function createFilelike(name: string, data: string) {
    let filelike: Filelike = {
      name,
      //stream: () => {const readableStream = Readable.from([data]); return readableStream;}
      stream: () => {const readableStream = new ReadableStream(data); return readableStream;}
  }
  return filelike;
}

console.log(` web 3 key  ${process.env.WEB3_STORAGE_API_KEY?.slice(0, 25)}`); // TODO debug code, delete after development

if (!process.env.WEB3_STORAGE_API_KEY) {
  console.error('web3 storage api key is not defined. You can create one on https://web3.storage')
}

const WEB3_STORAGE_CLIENT = new Web3Storage({ token : process.env.WEB3_STORAGE_API_KEY! })


type TGlobalState = {
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  
};

export const useGlobalState = create<TGlobalState>(set => ({
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),
}));




export const write = async (jobListing:JobListing) => {
  const jobListingJson = JSON.stringify(jobListing);
  const blob = new Blob([jobListingJson], { type: 'application/json' });
  // const cid = await WEB3_STORAGE_CLIENT.put(jobListingJson)

  const file = Web3File.fromBlob(blob, 'image.png', {});
  // const file = Web3File.fromText('web3file', 'file.txt', null);
  // const file = File.fromIterable("jobListing.json", [jobListingJson]);

  const filelike = createFilelike('jobListing.json', jobListingJson);
  const cid = await WEB3_STORAGE_CLIENT.put([filelike]);

  console.log('Content added with CID:', cid);
};

export async function readByCid(cid:string) {
  const dummy_cid = "bafybeia6nedhdk5sgrqeanq3uznjfuqn73t2m7g6vpjm4wfhyi6om6lxby";
  const root_cid = "";

  const info = await WEB3_STORAGE_CLIENT.status(dummy_cid);
  const res = await WEB3_STORAGE_CLIENT.get(dummy_cid);

  const files = await res!.files(); // Promise<Web3File[]>

  for (const file of files) {
    console.log(`${file.cid} ${file.name} ${file.size}`);
  }
}

export async function readAll() {
  const dummy_cid = "bafybeia6nedhdk5sgrqeanq3uznjfuqn73t2m7g6vpjm4wfhyi6om6lxby";
  const root_cid = "";
  const cid = dummy_cid;

  const info = await WEB3_STORAGE_CLIENT.status(cid);
  console.log(`Info for cid "${cid}": ${info}`);

  const res = await WEB3_STORAGE_CLIENT.get(cid);

  const files = await res!.files(); // Promise<Web3File[]>

  for (const file of files) {
    console.log(`${file.cid} ${file.name} ${file.size}`);
  }
}



function update () {
  
}





const jobListing: JobListing = {
  roleTitle: "Title",
  description: "description",
  location: "London",
  maxSalary: 170000,
  minSalary: 90000,
  bounty: 5000,
  companyName: "Google"
};

write(jobListing).then(() => {
  console.log('Writing completed');
}).catch((error) => {
  console.log('Error during reading:', error);
});

readAll().then(() => {
  console.log('Reading completed');
}).catch((error) => {
  console.log('Error during reading:', error);
});
