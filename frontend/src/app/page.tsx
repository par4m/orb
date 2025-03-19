import Link from 'next/link'

export default function Home() {
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
              className="text-gray-700 hover:text-ucblue transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="uc-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            University of California Open Source Repository Browser
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            A discovery tool designed to map and classify open source projects across the UC system.
          </p>
          <Link 
            href="/repositories" 
            className="inline-block bg-ucgold text-ucblue-dark font-bold py-3 px-8 rounded-lg hover:bg-ucgold-dark transition-colors"
          >
            Explore Repositories
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-ucblue">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="uc-card p-6">
              <h3 className="text-xl font-bold mb-3 text-ucblue">Comprehensive Repository Mapping</h3>
              <p className="text-gray-600">
                UC ORB catalogues open source projects across all UC campuses, making them discoverable in one centralized location.
              </p>
            </div>
            
            <div className="uc-card p-6">
              <h3 className="text-xl font-bold mb-3 text-ucblue">Advanced Search & Filtering</h3>
              <p className="text-gray-600">
                Find repositories by campus, programming language, topic, and keywords to discover relevant projects quickly.
              </p>
            </div>
            
            <div className="uc-card p-6">
              <h3 className="text-xl font-bold mb-3 text-ucblue">Collaborative Platform</h3>
              <p className="text-gray-600">
                UC ORB facilitates connections between researchers, students, and developers across different UC campuses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Participating Campuses */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-ucblue">Participating Campuses</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['UC Berkeley', 'UC Davis', 'UC Los Angeles', 'UC San Diego', 'UC Santa Barbara', 'UC Santa Cruz'].map((campus) => (
              <div key={campus} className="uc-card p-4 text-center">
                <p className="font-semibold text-ucblue">{campus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-ucblue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Discover the wealth of open source projects from across the University of California system.
          </p>
          <Link 
            href="/repositories" 
            className="inline-block bg-ucgold text-ucblue-dark font-bold py-3 px-8 rounded-lg hover:bg-ucgold-dark transition-colors"
          >
            Browse Repositories
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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
  )
} 