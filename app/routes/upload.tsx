
import { useState, type FormEvent } from 'react';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'

const upload = () => {
	const [isProcessing, setIsProcessing] = useState(false);
	const [statusText, setStatusText] = useState('');
	const [file, setFile] = useState<File | null>(null);

	const handleFileSelect = (file: File | null)=>{
		setFile(file)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget.closest('form');
		if(!form) return;
		const formData = new FormData(form);

		const companyName = formData.get('company-name');
		const jobTitle = formData.get('job-title');
		const jobDescription = formData.get('job-description');

		console.log({
			companyName, jobTitle, jobDescription, file
		});

	}

  return (
	<main className="bg-[url('/images/bg-main.svg')] bg-cover">
   <Navbar/>
   
    <section className="main-section">
		<div className='page-heading py-16'>
			<h1>Smart feedback for your dream job</h1>
			{isProcessing ? (
				<>
					<h2>{statusText}</h2>
					<img src="/public/images/resume-scan.gif" alt="" className='w-full' />
				</>
			) : (
				<h2>Drop your resume for an ATS  score and improvement tips</h2>
			)}
			{!isProcessing && (
				<form action="" id='upload-form' className='flex flex-col gap-4' onSubmit={handleSubmit}>
					<div className='form-div'>
						<label htmlFor="company-name">Company Name</label>
						<input type="text" name="company-name" id="company-name" placeholder='Company Name' />
					</div>
					<div className='form-div'>
						<label htmlFor="job-title">Job Title</label>
						<input type="text" name="job-title" id="job-title" placeholder='Job Title' />
					</div>
					<div className='form-div'>
						<label htmlFor="job-description">Job Description</label>
						<textarea rows={5}name="job-description" id="job-description" placeholder='Job Description' />
					</div>
					<div className='form-div'>
						<label htmlFor="uploader">Upload Resume</label>
						<FileUploader onFileSelect={handleFileSelect} />
	
					</div>
					<button 
					type='submit'
					className='primary-button'>Analyze Resume</button>
				</form>
			)}
		</div>
	</section>
	</main>
  )
}

export default upload