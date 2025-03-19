import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-ucblue">UC ORB</h1>
          <nav className="space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-ucblue transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/repositories" 
              className="text-gray-700 hover:text-ucblue transition-colors"
            >
              Repositories
            </Link>
            <Link 
              href="/about" 
              className="text-ucblue font-medium"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-ucblue">About UC ORB</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-700 mb-8">
              The University of California Open Repository Browser (UC ORB) is a discovery tool designed to map and classify open source projects across the University of California system.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">Our Mission</h2>
            <p>
              UC ORB aims to increase the visibility and accessibility of open source research software developed across the University of California's ten campuses. By bringing these repositories together in one searchable platform, we hope to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Facilitate collaboration between researchers across different UC campuses</li>
              <li>Showcase the innovative work being done by UC faculty, researchers, and students</li>
              <li>Provide a centralized resource for discovering research tools and libraries</li>
              <li>Promote open science and reproducible research practices</li>
              <li>Help identify opportunities for cross-campus integration of similar projects</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">Our Approach</h2>
            <p>
              UC ORB collects metadata from GitHub repositories associated with UC campuses, classifying them by:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Campus of origin</li>
              <li>Programming language</li>
              <li>Research topic and field</li>
              <li>Library dependencies and technologies used</li>
              <li>Development activity and community engagement</li>
            </ul>
            <p className="mt-4">
              Our platform is designed to be simple to use while providing powerful search and filtering capabilities. Whether you're looking for libraries in a specific domain, tools built with a particular technology, or want to discover what researchers at another campus are working on, UC ORB helps you find relevant resources quickly.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">The Team</h2>
            <p>
              UC ORB is a collaborative project developed by a team of researchers, developers, and librarians from across the UC system, with support from the UC Office of the President and the California Digital Library.
            </p>
            <p className="mt-4">
              Our team is committed to supporting open science infrastructure and promoting the sharing of research software. We believe that open source tools developed at public universities should be easily discoverable and accessible to all.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-8 mt-12 border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Get Involved</h2>
              <p className="mb-4">
                UC ORB is an open source project itself! We welcome contributions from the UC community and beyond.
              </p>
              <p className="mb-4">
                Interested in adding your repository to our database? Want to contribute to the development of UC ORB? Have suggestions for new features?
              </p>
              <div className="mt-6">
                <a href="mailto:contact@ucorb.example.edu" className="px-4 py-2 bg-ucblue text-white rounded-md hover:bg-blue-700 transition-colors">
                  Get in Touch
                </a>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">UC Campus Network</h2>
            <p>
              The University of California system consists of ten campuses across California:
            </p>
            <ul className="grid grid-cols-2 gap-4 mt-4">
              <li className="bg-white p-4 rounded shadow-sm border border-gray-100">UC Berkeley</li>
              <li className="bg-white p-4 rounded shadow-sm border border-gray-100">UC Davis</li>
              <li className="bg-white p-4 rounded shadow-sm border border-gray-100">UC Irvine</li>
              <li className="bg-white p-4 rounded shadow-sm border border-gray-100">UCLA</li>
              <li className="bg-white p-4 rounded shadow-sm border border-gray-100">UC Merced</li>
              <li className="bg-white p-4 rounded shadow-sm border border-gray-100">UC Riverside</li>
              <li className="bg-white p-4 rounded shadow-sm border border-gray-100">UC San Diego</li>
              <li className="bg-white p-4 rounded shadow-sm border border-gray-100">UC San Francisco</li>
              <li className="bg-white p-4 rounded shadow-sm border border-gray-100">UC Santa Barbara</li>
              <li className="bg-white p-4 rounded shadow-sm border border-gray-100">UC Santa Cruz</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-800">Technical Implementation</h2>
            <p>
              UC ORB is built with a modern tech stack:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Frontend:</strong> Next.js, React, and TailwindCSS for a responsive and accessible user interface</li>
              <li><strong>Backend:</strong> FastAPI Python framework for a high-performance API</li>
              <li><strong>Data Processing:</strong> Python-based ETL pipelines for fetching and processing repository information</li>
              <li><strong>Database:</strong> PostgreSQL for reliable data storage</li>
            </ul>
            <p className="mt-4">
              Our code is available on GitHub, licensed under the MIT License, allowing for wide adoption and modification by other institutions interested in implementing similar repository discovery tools.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">UC ORB</h3>
              <p className="text-gray-300">
                University of California Open Source Repository Browser is a discovery tool designed to map and classify open source projects across the UC system.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link href="/repositories" className="text-gray-300 hover:text-white">Repositories</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://github.com" className="text-gray-300 hover:text-white">GitHub</a></li>
                <li><a href="https://opensource.org" className="text-gray-300 hover:text-white">Open Source Initiative</a></li>
                <li><a href="https://www.universityofcalifornia.edu/" className="text-gray-300 hover:text-white">UC System</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <p className="text-gray-300 mb-2">
                Have questions or feedback? Get in touch with the UC ORB team.
              </p>
              <a href="mailto:contact@ucorb.example.edu" className="text-ucgold hover:underline">
                contact@ucorb.example.edu
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} UC ORB Demo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 