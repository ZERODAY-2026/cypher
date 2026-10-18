import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Database,
  Search,
  ShieldCheck,
  Code2,
  BarChart3,
  Layers,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Compass,
  GraduationCap,
  Briefcase,
  Activity
} from 'lucide-react';
import { FAQAccordion, FAQItem } from '../../components/marketing/FAQAccordion';
import SculptureHero from '../../components/ui/liquid-sculpture-hero';

export const LandingPage: React.FC = () => {

  const faqItems: FAQItem[] = [
    {
      question: 'What is DataMind?',
      answer:
        'DataMind is an AI-powered natural language analytics workspace designed to bridge the gap between human curiosity and structured database engines. It enables analysts, operators, and researchers to explore data through plain-English questions without writing SQL from scratch.'
    },
    {
      question: 'Do I need to know SQL to use DataMind?',
      answer:
        'No SQL knowledge is required. You can compose questions in plain English, and DataMind interprets your analytical intent, generates the corresponding SQL query, and provides visual charts, tables, and natural explanations.'
    },
    {
      question: 'How does DataMind generate answers?',
      answer:
        'The intended architecture pairs Google Gemma language models for query reasoning with an enterprise data warehouse such as Snowflake. The AI translates questions into ANSI-compliant SQL, validates schemas, and computes answers deterministically.'
    },
    {
      question: 'Can I inspect the SQL behind a result?',
      answer:
        'Yes. Transparency is a core principle. Every analytical response includes an inspectable SQL panel, applied aggregations, data filters, row counts, and calculation assumptions so you can verify the results.'
    },
    {
      question: 'Does the current demo connect to a live database?',
      answer:
        'No. This public release is strictly a frontend demonstration prototype. It uses isolated, deterministic sample data from a fictional enterprise sales dataset to illustrate workflows. No live Snowflake instance or LLM endpoint is queried.'
    },
    {
      question: 'Which technologies are planned for the full version?',
      answer:
        'The planned full-stack production architecture will integrate Google Gemma via server-side APIs for reasoning and Snowflake as the underlying analytical cloud warehouse, coupled with secure role-based access control.'
    }
  ];

  return (
    <div className="space-y-10 sm:space-y-14 py-6 sm:py-8">
      {/* 5.2 Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <SculptureHero
            brand="DataMind"
            eyebrow="AI-POWERED DATA ANALYTICS"
            headline={"Turn Your Data\nInto Answers."}
            headlineAccent="Into Answers."
            body="Ask questions in plain English. Explore meaningful insights, understand the numbers, and see the evidence behind every answer."
            primaryCta={{ label: "Explore DataMind", href: "/dashboard" }}
            secondaryCta={{ label: "Explore Features", href: "#features" }}
            background="#FFFFFF"
            textColor="#0F172A"
            accentColor="#2563EB"
            backdropText="DATAMIND"
            showNav={false}
            showCredit={false}
            height="520px"
            hint="Move cursor across data sculpture"
            hintTouch="Touch data sculpture"
          />

          {/* 3 Trust-oriented points */}
          <div className="px-5 sm:px-8 py-3.5 border-t border-slate-100 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Natural-language questions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Inspectable SQL & evidence</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Clear, explainable results</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5.3 Trust and Capability Strip */}
      <section className="border-y border-slate-200 bg-white py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="space-y-0.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Capability</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Natural-Language Analytics</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Foundation</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Data-Grounded Answers</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Auditability</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">SQL Transparency</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Exploration</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Interactive Visualizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.4 Problem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Data should be easier to understand.
          </h2>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            Getting answers from structured data often requires technical skills, complicated queries, and time-consuming analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Complex queries</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              You shouldn't need to write SQL just to ask a basic analytical question. Traditional BI dashboards lock answers behind rigid parameter filters.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Disconnected insights</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Numbers are difficult to trust when their source and calculation are unclear. Without visible logic, stakeholders waste hours debating validity.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Slow analysis</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Finding patterns in large datasets should not require endless manual work, spreadsheet exports, and repeated requests to overloaded data teams.
            </p>
          </div>
        </div>
      </section>

      {/* 5.5 Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-1">
            CAPABILITIES
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            From questions to verifiable insights.
          </h2>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            Explore how DataMind turns analytical curiosities into inspectable, reproducible findings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2.5 hover:border-slate-300 transition-colors shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800">
              <Search className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Ask in plain English</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Write questions naturally without memorizing table schemas, join syntax, or aggregation semantics.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2.5 hover:border-slate-300 transition-colors shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800">
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Explore real data</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The planned full-stack system connects to actual Snowflake data warehouses. In this prototype, explore a rich 8-table sales dataset.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2.5 hover:border-slate-300 transition-colors shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800">
              <Code2 className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Inspect SQL</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every answer displays its complete underlying SQL code, allowing technical team members to review, verify, and copy queries.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2.5 hover:border-slate-300 transition-colors shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800">
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Visualize results</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Automatically rendered responsive charts and sorted tables offer multiple perspectives on trends, rankings, and volume splits.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2.5 hover:border-slate-300 transition-colors shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800">
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Understand the evidence</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Inspect the exact mathematical aggregations, row counts, timezone assumptions, and filter rules applied to formulate the answer.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2.5 hover:border-slate-300 transition-colors shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Handle uncertainty</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When questions are ambiguous, unsupported, or lack data coverage, DataMind highlights limitations rather than hallucinating facts.
            </p>
          </div>
        </div>
      </section>

      {/* 5.9 Use Cases Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-1">
            APPLICATIONS
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Useful wherever data matters.
          </h2>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            DataMind assists teams and curious individuals across multiple analytical scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Business analytics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quickly answer executive inquiries about revenue, product margins, regional distribution, and quarterly trends.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Education & research</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Help students and researchers understand SQL concepts by connecting natural-language questions to generated query patterns.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Operations & reporting</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empower operations teams to check order volumes, delivery fulfillment statuses, and inventory shortages in real time.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">Data exploration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rapidly explore newly onboarded relational schemas without having to configure bespoke reporting dashboards first.
            </p>
          </div>
        </div>
      </section>

      {/* 5.10 FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-1">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Common questions about DataMind.
          </h2>
          <p className="text-slate-600 mt-1 text-xs sm:text-sm leading-relaxed">
            Learn more about the current frontend prototype and the planned full-stack architecture.
          </p>
        </div>

        <FAQAccordion items={faqItems} />
      </section>

      {/* 5.11 Final CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 text-center max-w-3xl mx-auto shadow-2xs space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Your data has answers. Start exploring.
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
            Experience the DataMind interface with sample datasets, suggested prompts, and inspectable analytical workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors whitespace-nowrap"
            >
              <span>Launch DataMind Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/features"
              className="px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors whitespace-nowrap"
            >
              Explore Features
            </Link>
          </div>
          <p className="text-[11px] text-slate-400">
            Frontend demonstration prototype · No account or credentials required
          </p>
        </div>
      </section>
    </div>
  );
};
