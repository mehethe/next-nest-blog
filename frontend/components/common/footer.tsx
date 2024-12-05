import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-primary h-[60px]'>
      <div className='h-full container mx-auto flex flex-col justify-center items-center sm:flex-row sm:justify-between '>
        <h3 className='text-lg text-background font-medium tracking-tight'>
          NN Blog
        </h3>
        <nav className='text-background text-xs md:text-sm tracking-tight flex gap-4'>
          <Link href='#'>About Us</Link>
          <Link href='#'>FAQs</Link>
        </nav>
      </div>
    </footer>
  );
}
