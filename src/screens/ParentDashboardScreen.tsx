import React from 'react';
import { Shield, Clock, Flame, Award, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ALL_UNITS } from '../data/unitsMeta';

export const ParentDashboardScreen: React.FC = () => {
  const { state, navigateTo } = useGame();

  const studyMinutes = Math.max(1, Math.round(state.totalStudySeconds / 60));
  const lessonsCompleted = state.attemptLogs.length;

  const logs = state.attemptLogs;
  const totalQuestions = logs.reduce((sum, l) => sum + l.total, 0);
  const totalCorrect = logs.reduce((sum, l) => sum + l.score, 0);
  const overallAccuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 90;

  // Weak topics from error bank
  const errorItems = Object.values(state.errorBank).filter(i => !i.mastered);
  const weakTopicsMap: Record<string, number> = {};
  errorItems.forEach(item => {
    weakTopicsMap[item.topic] = (weakTopicsMap[item.topic] || 0) + item.wrongCount;
  });

  const sortedWeakTopics = Object.entries(weakTopicsMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-amber-100">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white transition-colors flex items-center gap-1.5 font-bold text-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to App</span>
        </button>

        <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
          <Shield className="w-3.5 h-3.5 text-slate-500" />
          <span>Parent & Teacher Dashboard</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-game">
          Learner Progress Overview
        </h1>
        <p className="text-xs text-slate-500">
          Hồ sơ theo dõi việc học tiếng Anh của bé {state.profile.name || 'Hero'}. Toàn bộ tiến độ và lỗi sai được lưu trữ an toàn ngay trên thiết bị.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 block">Total Study Time</span>
          <span className="text-2xl font-black text-slate-800 tabular-nums">
            {studyMinutes} min
          </span>
          <span className="text-[11px] text-slate-400 block">Thời gian học tập</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 block">Lessons Completed</span>
          <span className="text-2xl font-black text-indigo-700 tabular-nums">
            {lessonsCompleted} rounds
          </span>
          <span className="text-[11px] text-slate-400 block">Số bài đã luyện</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 block">Current Streak</span>
          <span className="text-2xl font-black text-orange-600 tabular-nums">
            {state.streak} days
          </span>
          <span className="text-[11px] text-slate-400 block">Chuỗi ngày chăm chỉ</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 block">Overall Accuracy</span>
          <span className="text-2xl font-black text-emerald-600 tabular-nums">
            {overallAccuracy}%
          </span>
          <span className="text-[11px] text-slate-400 block">Tỉ lệ trả lời đúng</span>
        </div>
      </div>

      {/* Focus & Weak Topics */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-black text-slate-800 font-game">
            Weak Topics & Recommendation · Điểm Cần Cải Thiện
          </h2>
        </div>

        {sortedWeakTopics.length === 0 ? (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Tuyệt vời! Bé chưa có điểm yếu nghiêm trọng nào trong ngân hàng lỗi sai.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortedWeakTopics.map(([topic, count]) => (
              <div
                key={topic}
                className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-extrabold text-slate-800 block capitalize">
                    {topic.replace(/-/g, ' ')}
                  </span>
                  <span className="text-slate-500">Khuyên dùng Smart Review</span>
                </div>
                <span className="font-black text-rose-600 bg-white px-2.5 py-1 rounded-xl border border-rose-200">
                  {count} lỗi
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h2 className="text-lg font-black text-slate-800 font-game">
          Recent Activity Log · Lịch Sử Làm Bài Gần Đây
        </h2>

        {state.attemptLogs.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No practice rounds logged yet.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {state.attemptLogs.slice(0, 5).map(log => {
              const unit = ALL_UNITS.find(u => u.id === log.unitId);
              return (
                <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">
                      Unit {log.unitId}: {unit?.title || 'Adventure'} – {log.stageId.toUpperCase()}
                    </span>
                    <span className="text-slate-400">
                      {new Date(log.completedAt).toLocaleDateString()} · {log.durationSeconds}s
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-emerald-700 block">
                      {log.score} / {log.total} ({log.accuracy}%)
                    </span>
                    <span className="text-[11px] text-amber-600 font-bold">
                      +{log.xpEarned} XP · +{log.coinsEarned} 🪙
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
