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
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-nsut-maroon via-red-900 to-nsut-maroon text-white overflow-hidden">
      {/* Background pattern - lighter opacity for dark background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Decorative gradient accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-nsut-yellow/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-nsut-yellow/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 flex-wrap">
            <Heart className="w-8 h-8 md:w-10 md:h-10 text-nsut-yellow" />
            <h2 className="font-serif text-2xl md:text-5xl font-bold">
              Giving Back to NSUT
            </h2>
          </div>
          <p className="text-base md:text-xl max-w-3xl mx-auto leading-relaxed text-white/90">
            Sustaining Excellence Through Alumni Contributions. Help sustain a supportive ecosystem where knowledge, opportunity, and values are passed from one generation to the next.
          </p>
        </div>

        {/* Contribution Types — Editorial List */}
        <div className="max-w-4xl mx-auto mb-12">
          {contributionTypes.map((type, index) => (
            <div key={index}>
              <div className="flex items-start gap-4 md:gap-6 py-5 md:py-6">
                <span className="text-nsut-yellow/40 font-serif text-4xl md:text-5xl font-bold leading-none select-none shrink-0 w-10 md:w-14 text-right">
                  {index + 1}
                </span>
                <div className="pt-1">
                  <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-1">
                    {type.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
              {index < contributionTypes.length - 1 && (
                <hr className="border-nsut-yellow/20 ml-14 md:ml-20" />
              )}
            </div>
          ))}
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
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
          >
            Learn More
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trust indicator */}
        <p className="mt-6 text-sm text-white/70 text-center">
          Your contribution is tax-deductible and goes directly to supporting NSUT's mission
        </p>
      </div>
    </section>
  );
};

export default GivingSection;
