import { Heart, Briefcase, Award, MessageSquare, BookOpen, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const GivingSection = () => {
  const contributionTypes = [
    {
      icon: Briefcase,
      title: 'Internship Opportunities',
      description: 'Provide structured internships offering real-world exposure and professional experience.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Scholarship & Financial Support',
      description: 'Support talented students facing financial constraints through scholarships.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageSquare,
      title: 'Mentorship & Career Guidance',
      description: 'Guide students through mentoring, sharing career insights and life lessons.',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: BookOpen,
      title: 'Academic & Institutional Support',
      description: 'Deliver guest lectures, workshops, and support research initiatives.',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23800000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}/>
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-3">
            <span className="text-nsut-maroon text-xs md:text-sm font-semibold tracking-wider uppercase">
              Alumni Contributions
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Heart className="w-10 h-10 text-nsut-maroon" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">
              Giving Back to NSUT
            </h2>
          </div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
            Sustaining Excellence Through Alumni Contributions. Help sustain a supportive ecosystem where knowledge, opportunity, and values are passed from one generation to the next.
          </p>
        </div>

        {/* Contribution Types Grid */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 p-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contributionTypes.map((type, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-serif text-lg font-bold text-nsut-yellow mb-2">
                {type.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {type.description}
              </p>
            </div>
          ))}
        </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/login"
            className="group bg-nsut-yellow hover:bg-nsut-yellow/90 text-nsut-maroon px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Lock className="w-5 h-5" />
            Login to Start Giving
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/giving"
            className="group bg-white hover:bg-gray-50 text-nsut-maroon border-2 border-nsut-maroon/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
          >
            Learn More
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trust indicator */}
        <p className="mt-6 text-sm text-gray-500 text-center">
          Your contribution is tax-deductible and goes directly to supporting NSUT's mission
        </p>
      </div>
    </section>
  );
};

export default GivingSection;
