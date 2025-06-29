// // import React, { useState, useEffect } from 'react';
// // import { Trophy, Medal, Crown, Users, TrendingUp, Star } from 'lucide-react';
// // import { useAuth } from '../../context/AuthContext';
// // import { useSocket } from '../../context/SocketContext';
// // import api from '../../services/api';
// // import Header from '../../components/common/Header';

// // const Leaderboard = () => {
// //   const { user } = useAuth();
// //   const { socket, joinLeaderboard, requestLeaderboard } = useSocket();
// //   const [leaderboardData, setLeaderboardData] = useState([]);
// //   const [timeFilter, setTimeFilter] = useState('current');
// //   const [loading, setLoading] = useState(true);
// //   const [currentChallenge, setCurrentChallenge] = useState(null);
// //   const [userPosition, setUserPosition] = useState(null);

// //   useEffect(() => {
// //     fetchCurrentChallenge();
// //     fetchLeaderboardData();
// //   }, [timeFilter]);

// //   useEffect(() => {
// //     if (currentChallenge && socket && timeFilter === 'current') {
// //       joinLeaderboard(currentChallenge._id);
      
// //       socket.on('leaderboard_update', (data) => {
// //         setLeaderboardData(data);
// //         updateUserPosition(data);
// //       });

// //       return () => {
// //         socket.off('leaderboard_update');
// //       };
// //     }
// //   }, [currentChallenge, socket, timeFilter]);

// //   const fetchCurrentChallenge = async () => {
// //     try {
// //       const response = await api.get('/challenges/current');
// //       setCurrentChallenge(response.data);
// //     } catch (error) {
// //       console.error('Error fetching current challenge:', error);
// //     }
// //   };

// //   const fetchLeaderboardData = async () => {
// //     try {
// //       setLoading(true);
// //       let endpoint = '/leaderboard/global';
      
// //       if (timeFilter === 'current') {
// //         endpoint = '/leaderboard/current';
// //       }
      
// //       const response = await api.get(endpoint);
// //       setLeaderboardData(response.data);
// //       updateUserPosition(response.data);
// //     } catch (error) {
// //       console.error('Error fetching leaderboard:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // const updateUserPosition = (data) => {
// //   //   const userEntry = data.find(entry => entry.userId === user.id);
// //   //   setUserPosition(userEntry);
// //   // };
// // const updateUserPosition = (data) => {
// //   // Fix the user ID comparison - check both possible formats
// //   const userEntry = data.find(entry => 
// //     entry.userId === user.id || 
// //     entry.userId === user._id || 
// //     entry.id === user.id || 
// //     entry.id === user._id
// //   );
// //   setUserPosition(userEntry);
// // };

// //   const getRankIcon = (rank) => {
// //     switch (rank) {
// //       case 1:
// //         return <Crown className="w-6 h-6 text-yellow-500" />;
// //       case 2:
// //         return <Medal className="w-6 h-6 text-gray-400" />;
// //       case 3:
// //         return <Medal className="w-6 h-6 text-amber-600" />;
// //       default:
// //         return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
// //     }
// //   };

// //   const getRankBadge = (rank) => {
// //     if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
// //     if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
// //     if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
// //     return 'bg-white border border-gray-200 text-gray-700';
// //   };

// //   const getScoreColor = (score) => {
// //     if (score >= 90) return 'text-green-600';
// //     if (score >= 70) return 'text-blue-600';
// //     if (score >= 50) return 'text-amber-600';
// //     return 'text-gray-600';
// //   };

// //   const formatDate = (date) => {
// //     return new Date(date).toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
// //       <Header />

// //       <div className="container mx-auto px-6 py-8">
// //         {/* Page Header */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
// //             <Trophy className="w-10 h-10 text-purple-600" />
// //             <span>Leaderboard</span>
// //           </h1>
// //           <p className="text-xl text-gray-600">See how you rank against other photographers</p>
// //         </div>

// //         <div className="grid lg:grid-cols-4 gap-8">
// //           {/* Main Leaderboard */}
// //           <div className="lg:col-span-3">
// //             {/* Filter Tabs */}
// //             <div className="bg-white rounded-2xl shadow-lg mb-6">
// //               <div className="p-6 border-b border-gray-200">
// //                 <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
// //                   <button 
// //                     onClick={() => setTimeFilter('current')}
// //                     className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
// //                       timeFilter === 'current' 
// //                         ? 'bg-white text-purple-600 shadow-sm' 
// //                         : 'text-gray-600 hover:text-gray-800'
// //                     }`}
// //                   >
// //                     Current Challenge
// //                   </button>
// //                   <button 
// //                     onClick={() => setTimeFilter('global')}
// //                     className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
// //                       timeFilter === 'global' 
// //                         ? 'bg-white text-purple-600 shadow-sm' 
// //                         : 'text-gray-600 hover:text-gray-800'
// //                     }`}
// //                   >
// //                     All Time
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* User's Position Highlight */}
// //               {userPosition && (
// //                 <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <h3 className="text-lg font-semibold text-purple-700 mb-2">Your Position</h3>
// //                       <div className="flex items-center space-x-4">
// //                         <div className="flex items-center space-x-2">
// //                           {getRankIcon(userPosition.rank)}
// //                           <span className="text-2xl font-bold text-gray-800">#{userPosition.rank}</span>
// //                           <span className="text-gray-600">{userPosition.player}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="text-right">
// //                       <div className="text-3xl font-bold text-purple-600">{userPosition.score} points</div>
// //                       <div className="text-sm text-gray-500">
// //                         {userPosition.lastActivity && `Last activity: ${formatDate(userPosition.lastActivity)}`}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Leaderboard Table */}
// //               <div className="overflow-hidden">
// //                 {/* Table Header */}
// //                 <div className="bg-gray-50 px-6 py-4 grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
// //                   <div className="col-span-1">Rank</div>
// //                   <div className="col-span-5">Player</div>
// //                   <div className="col-span-3">Score</div>
// //                   <div className="col-span-3">Last Activity</div>
// //                 </div>

// //                 {/* Loading State */}
// //                 {loading ? (
// //                   <div className="p-8 text-center">
// //                     <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //                     <p className="text-gray-600">Loading leaderboard...</p>
// //                   </div>
// //                 ) : (
// //                   /* Leaderboard Entries */
// //                   <div className="divide-y divide-gray-200">
// //                     {leaderboardData.map((entry, index) => {
// //                      const isCurrentUser = entry.userId === user._id || 
// //                      entry.userId === user.id || 
// //                      entry.id === user._id || 
// //                      entry.id === user.id;
// //                       return (
// //                         <div 
// //                           key={entry.userId || index} 
// //                           className={`px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors ${
// //                             isCurrentUser ? 'bg-purple-50 border-l-4 border-purple-500' : ''
// //                           }`}
// //                         >
// //                           {/* Rank */}
// //                           <div className="col-span-1">
// //                             <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${getRankBadge(entry.rank)}`}>
// //                               {entry.rank <= 3 ? getRankIcon(entry.rank) : <span className="font-bold">#{entry.rank}</span>}
// //                             </div>
// //                           </div>

// //                           {/* Player */}
// //                           <div className="col-span-5">
// //                             <div className="flex items-center space-x-3">
// //                               <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
// //                                 {entry.avatar ? (
// //                                   <img src={entry.avatar} alt={entry.player} className="w-10 h-10 rounded-full" />
// //                                 ) : (
// //                                   <span className="text-purple-600 font-semibold text-sm">
// //                                     {entry.player.slice(0, 2).toUpperCase()}
// //                                   </span>
// //                                 )}
// //                               </div>
// //                               <div>
// //                                 <div className="font-semibold text-gray-800 flex items-center space-x-2">
// //                                   <span>{entry.player}</span>
// //                                   {isCurrentUser && (
// //                                     <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium">
// //                                       You
// //                                     </span>
// //                                   )}
// //                                   {entry.rank === 1 && (
// //                                     <Star className="w-4 h-4 text-yellow-500 fill-current" />
// //                                   )}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </div>

// //                           {/* Score */}
// //                           <div className="col-span-3">
// //                             <div className={`text-2xl font-bold ${getScoreColor(entry.score)}`}>
// //                               {entry.score}
// //                             </div>
// //                           </div>

// //                           {/* Last Activity */}
// //                           <div className="col-span-3">
// //                             <div className="text-gray-600">
// //                               {entry.lastActivity ? formatDate(entry.lastActivity) : '-'}
// //                             </div>
// //                           </div>
// //                         </div>
// //                       );
// //                     })}
                    
// //                     {leaderboardData.length === 0 && !loading && (
// //                       <div className="p-8 text-center text-gray-500">
// //                         No entries found for this leaderboard.
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Sidebar */}
// //           <div className="space-y-6">
// //             {/* Top Performers */}
// //             <div className="bg-white rounded-2xl shadow-lg p-6">
// //               <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
// //                 <TrendingUp className="w-5 h-5 text-green-500" />
// //                 <span>Top Performers</span>
// //               </h3>
              
// //               {/* Podium */}
// //               <div className="space-y-4">
// //                 {leaderboardData.slice(0, 3).map((entry, index) => (
// //                   <div key={entry.userId} className={`flex items-center space-x-3 p-3 rounded-lg border ${
// //                     index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200' :
// //                     index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200' :
// //                     'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200'
// //                   }`}>
// //                     {getRankIcon(entry.rank)}
// //                     <div>
// //                       <div className="font-bold text-gray-800">{entry.player}</div>
// //                       <div className="text-sm text-gray-600">{entry.score} points</div>
// //                     </div>
// //                     <div className={`ml-auto text-white text-xs px-2 py-1 rounded-full font-bold ${
// //                       index === 0 ? 'bg-yellow-500' :
// //                       index === 1 ? 'bg-gray-500' :
// //                       'bg-amber-500'
// //                     }`}>
// //                       #{entry.rank}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Challenge Stats */}
// //             {currentChallenge && timeFilter === 'current' && (
// //               <div className="bg-white rounded-2xl shadow-lg p-6">
// //                 <h3 className="text-xl font-bold text-gray-800 mb-4">Challenge Stats</h3>
// //                 <div className="space-y-4">
// //                   <div className="flex justify-between items-center">
// //                     <span className="text-gray-600">Total Participants</span>
// //                     <span className="text-2xl font-bold text-purple-600">
// //                       {currentChallenge.totalParticipants || 0}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between items-center">
// //                     <span className="text-gray-600">Submissions</span>
// //                     <span className="text-xl font-semibold text-green-600">
// //                       {currentChallenge.totalSubmissions || 0}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between items-center">
// //                     <span className="text-gray-600">Max Score</span>
// //                     <span className="text-xl font-semibold text-blue-600">{currentChallenge.maxScore}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Achievement Badges */}
// //             <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
// //               <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
// //                 <Medal className="w-5 h-5" />
// //                 <span>Achievements</span>
// //               </h3>
// //               <div className="space-y-3">
// //                 <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
// //                   <div className="font-semibold">Leaderboard Climber</div>
// //                   <div className="text-sm text-purple-100">Reach top 10 in any challenge</div>
// //                 </div>
// //                 <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
// //                   <div className="font-semibold">Speed Demon</div>
// //                   <div className="text-sm text-purple-100">Submit within first hour</div>
// //                 </div>
// //                 <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
// //                   <div className="font-semibold">Consistency King</div>
// //                   <div className="text-sm text-purple-100">Join 10 challenges in a row</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Leaderboard;

// import React, { useState, useEffect } from 'react';
// import { Trophy, Medal, Crown, Users, TrendingUp, Star } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useSocket } from '../../context/SocketContext';
// import api from '../../services/api';
// import Header from '../../components/common/Header';

// const Leaderboard = () => {
//   const { user } = useAuth();
//   const { socket, joinLeaderboard, requestLeaderboard } = useSocket();
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const [timeFilter, setTimeFilter] = useState('current');
//   const [loading, setLoading] = useState(true);
//   const [currentChallenge, setCurrentChallenge] = useState(null);
//   const [userPosition, setUserPosition] = useState(null);

//   useEffect(() => {
//     fetchCurrentChallenge();
//     fetchLeaderboardData();
//   }, [timeFilter]);

//   useEffect(() => {
//     if (currentChallenge && socket && timeFilter === 'current') {
//       joinLeaderboard(currentChallenge._id);
      
//       socket.on('leaderboard_update', (data) => {
//         setLeaderboardData(data);
//         updateUserPosition(data);
//       });

//       return () => {
//         socket.off('leaderboard_update');
//       };
//     }
//   }, [currentChallenge, socket, timeFilter]);

//   const fetchCurrentChallenge = async () => {
//     try {
//       const response = await api.get('/challenges/active'); // Use /active instead of /current
//       setCurrentChallenge(response.data);
//     } catch (error) {
//       console.error('Error fetching current challenge:', error);
//     }
//   };

//   const fetchLeaderboardData = async () => {
//     try {
//       setLoading(true);
//       let endpoint = '/leaderboard/global';
      
//       if (timeFilter === 'current') {
//         endpoint = '/leaderboard/current';
//       }
      
//       const response = await api.get(endpoint);
//       setLeaderboardData(response.data);
//       updateUserPosition(response.data);
//     } catch (error) {
//       console.error('Error fetching leaderboard:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fixed: Handle multiple user ID formats
//   const updateUserPosition = (data) => {
//     const userEntry = data.find(entry => 
//       entry.userId === user._id || 
//       entry.userId === user.id || 
//       entry.id === user._id || 
//       entry.id === user.id
//     );
//     setUserPosition(userEntry);
//   };

//   const getRankIcon = (rank) => {
//     switch (rank) {
//       case 1:
//         return <Crown className="w-6 h-6 text-yellow-500" />;
//       case 2:
//         return <Medal className="w-6 h-6 text-gray-400" />;
//       case 3:
//         return <Medal className="w-6 h-6 text-amber-600" />;
//       default:
//         return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
//     }
//   };

//   const getRankBadge = (rank) => {
//     if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
//     if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
//     if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
//     return 'bg-white border border-gray-200 text-gray-700';
//   };

//   const getScoreColor = (score) => {
//     if (score >= 90) return 'text-green-600';
//     if (score >= 70) return 'text-blue-600';
//     if (score >= 50) return 'text-amber-600';
//     return 'text-gray-600';
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <Header />

//       <div className="container mx-auto px-6 py-8">
//         {/* Page Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
//             <Trophy className="w-10 h-10 text-purple-600" />
//             <span>Leaderboard</span>
//           </h1>
//           <p className="text-xl text-gray-600">See how you rank against other photographers</p>
//         </div>

//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Main Leaderboard */}
//           <div className="lg:col-span-3">
//             {/* Filter Tabs */}
//             <div className="bg-white rounded-2xl shadow-lg mb-6">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
//                   <button 
//                     onClick={() => setTimeFilter('current')}
//                     className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
//                       timeFilter === 'current' 
//                         ? 'bg-white text-purple-600 shadow-sm' 
//                         : 'text-gray-600 hover:text-gray-800'
//                     }`}
//                   >
//                     Current Challenge
//                   </button>
//                   <button 
//                     onClick={() => setTimeFilter('global')}
//                     className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
//                       timeFilter === 'global' 
//                         ? 'bg-white text-purple-600 shadow-sm' 
//                         : 'text-gray-600 hover:text-gray-800'
//                     }`}
//                   >
//                     All Time
//                   </button>
//                 </div>
//               </div>

//               {/* User's Position Highlight */}
//               {userPosition && (
//                 <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="text-lg font-semibold text-purple-700 mb-2">Your Position</h3>
//                       <div className="flex items-center space-x-4">
//                         <div className="flex items-center space-x-2">
//                           {getRankIcon(userPosition.rank)}
//                           <span className="text-2xl font-bold text-gray-800">#{userPosition.rank}</span>
//                           <span className="text-gray-600">{userPosition.player}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-3xl font-bold text-purple-600">{userPosition.score} points</div>
//                       <div className="text-sm text-gray-500">
//                         {userPosition.lastActivity && `Last activity: ${formatDate(userPosition.lastActivity)}`}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Leaderboard Table */}
//               <div className="overflow-hidden">
//                 {/* Table Header */}
//                 <div className="bg-gray-50 px-6 py-4 grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
//                   <div className="col-span-1">Rank</div>
//                   <div className="col-span-5">Player</div>
//                   <div className="col-span-3">Score</div>
//                   <div className="col-span-3">Last Activity</div>
//                 </div>

//                 {/* Loading State */}
//                 {loading ? (
//                   <div className="p-8 text-center">
//                     <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading leaderboard...</p>
//                   </div>
//                 ) : (
//                   /* Leaderboard Entries */
//                   <div className="divide-y divide-gray-200">
//                     {leaderboardData.map((entry, index) => {
//                       // Fixed: Check multiple user ID formats
//                       const isCurrentUser = entry.userId === user._id || 
//                                            entry.userId === user.id || 
//                                            entry.id === user._id || 
//                                            entry.id === user.id;
//                       return (
//                         <div 
//                           key={entry.userId || entry.id || index} 
//                           className={`px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors ${
//                             isCurrentUser ? 'bg-purple-50 border-l-4 border-purple-500' : ''
//                           }`}
//                         >
//                           {/* Rank */}
//                           <div className="col-span-1">
//                             <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${getRankBadge(entry.rank)}`}>
//                               {entry.rank <= 3 ? getRankIcon(entry.rank) : <span className="font-bold">#{entry.rank}</span>}
//                             </div>
//                           </div>

//                           {/* Player */}
//                           <div className="col-span-5">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
//                                 {entry.avatar ? (
//                                   <img src={entry.avatar} alt={entry.player} className="w-10 h-10 rounded-full" />
//                                 ) : (
//                                   <span className="text-purple-600 font-semibold text-sm">
//                                     {entry.player.slice(0, 2).toUpperCase()}
//                                   </span>
//                                 )}
//                               </div>
//                               <div>
//                                 <div className="font-semibold text-gray-800 flex items-center space-x-2">
//                                   <span>{entry.player}</span>
//                                   {isCurrentUser && (
//                                     <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium">
//                                       You
//                                     </span>
//                                   )}
//                                   {entry.rank === 1 && (
//                                     <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Score */}
//                           <div className="col-span-3">
//                             <div className={`text-2xl font-bold ${getScoreColor(entry.score)}`}>
//                               {entry.score}
//                             </div>
//                           </div>

//                           {/* Last Activity */}
//                           <div className="col-span-3">
//                             <div className="text-gray-600">
//                               {entry.lastActivity ? formatDate(entry.lastActivity) : '-'}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
                    
//                     {leaderboardData.length === 0 && !loading && (
//                       <div className="p-8 text-center text-gray-500">
//                         No entries found for this leaderboard.
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Top Performers */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
//                 <TrendingUp className="w-5 h-5 text-green-500" />
//                 <span>Top Performers</span>
//               </h3>
              
//               {/* Podium */}
//               <div className="space-y-4">
//                 {leaderboardData.slice(0, 3).map((entry, index) => (
//                   <div key={entry.userId || entry.id} className={`flex items-center space-x-3 p-3 rounded-lg border ${
//                     index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200' :
//                     index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200' :
//                     'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200'
//                   }`}>
//                     {getRankIcon(entry.rank)}
//                     <div>
//                       <div className="font-bold text-gray-800">{entry.player}</div>
//                       <div className="text-sm text-gray-600">{entry.score} points</div>
//                     </div>
//                     <div className={`ml-auto text-white text-xs px-2 py-1 rounded-full font-bold ${
//                       index === 0 ? 'bg-yellow-500' :
//                       index === 1 ? 'bg-gray-500' :
//                       'bg-amber-500'
//                     }`}>
//                       #{entry.rank}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Challenge Stats */}
//             {currentChallenge && timeFilter === 'current' && (
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">Challenge Stats</h3>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Total Participants</span>
//                     <span className="text-2xl font-bold text-purple-600">
//                       {currentChallenge.totalParticipants || 0}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Submissions</span>
//                     <span className="text-xl font-semibold text-green-600">
//                       {currentChallenge.totalSubmissions || 0}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Max Score</span>
//                     <span className="text-xl font-semibold text-blue-600">{currentChallenge.maxScore}</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Achievement Badges */}
//             <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
//               <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
//                 <Medal className="w-5 h-5" />
//                 <span>Achievements</span>
//               </h3>
//               <div className="space-y-3">
//                 <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
//                   <div className="font-semibold">Leaderboard Climber</div>
//                   <div className="text-sm text-purple-100">Reach top 10 in any challenge</div>
//                 </div>
//                 <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
//                   <div className="font-semibold">Speed Demon</div>
//                   <div className="text-sm text-purple-100">Submit within first hour</div>
//                 </div>
//                 <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
//                   <div className="font-semibold">Consistency King</div>
//                   <div className="text-sm text-purple-100">Join 10 challenges in a row</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;

import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, Users, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import api from '../../services/api';
import Header from '../../components/common/Header';

const Leaderboard = () => {
  const { user } = useAuth();
  const { socket, joinLeaderboard, requestLeaderboard } = useSocket();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFilter, setTimeFilter] = useState('current');
  const [loading, setLoading] = useState(true);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    fetchCurrentChallenge();
    fetchLeaderboardData();
  }, [timeFilter]);

  useEffect(() => {
    if (currentChallenge && socket && timeFilter === 'current') {
      joinLeaderboard(currentChallenge._id);
      
      socket.on('leaderboard_update', (data) => {
        console.log('Received leaderboard update:', data);
        setLeaderboardData(data);
        updateUserPosition(data);
      });

      return () => {
        socket.off('leaderboard_update');
      };
    }
  }, [currentChallenge, socket, timeFilter]);

  const fetchCurrentChallenge = async () => {
    try {
      const response = await api.get('/challenges/active'); // Use /active for consistency
      setCurrentChallenge(response.data);
      console.log('Current challenge loaded for leaderboard:', response.data.title);
    } catch (error) {
      console.error('Error fetching current challenge:', error);
    }
  };

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      let endpoint = '/leaderboard/global';
      
      if (timeFilter === 'current') {
        endpoint = '/leaderboard/current';
      }
      
      console.log(`Fetching leaderboard from: ${endpoint}`);
      const response = await api.get(endpoint);
      console.log('Leaderboard data received:', response.data);
      
      setLeaderboardData(response.data);
      updateUserPosition(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // If current challenge leaderboard fails, show empty state instead of error
      if (timeFilter === 'current') {
        setLeaderboardData([]);
        setUserPosition(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Improved user ID matching with better debugging
  const updateUserPosition = (data) => {
    if (!user || !user._id) {
      console.log('No user found for position update');
      return;
    }

    console.log('Looking for user position. User ID:', user._id);
    console.log('Leaderboard entries:', data.length);
    
    // Try multiple ID formats to ensure matching
    const userEntry = data.find(entry => {
      const entryUserId = entry.userId || entry.id;
      const matchesId = entryUserId === user._id || 
                       entryUserId === user.id || 
                       entryUserId === user._id.toString() ||
                       (user.id && entryUserId === user.id.toString());
      
      if (matchesId) {
        console.log('Found user position:', entry.rank, 'for user:', entry.player);
      }
      
      return matchesId;
    });
    
    console.log('User position result:', userEntry);
    setUserPosition(userEntry);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
    return 'bg-white border border-gray-200 text-gray-700';
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-gray-600';
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // FIXED: Improved user identification with better debugging
  const isCurrentUser = (entry) => {
    if (!user || !user._id) return false;
    
    const entryUserId = entry.userId || entry.id;
    const matches = entryUserId === user._id || 
                   entryUserId === user.id || 
                   entryUserId === user._id.toString() ||
                   (user.id && entryUserId === user.id.toString());
    
    return matches;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <Header />
  
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center space-x-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <span>Leaderboard</span>
          </h1>
          <p className="text-xl text-gray-300">See how you rank in the arena. After 7 days the leaderboard resets</p>
        </div>
  
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            {/* Filter Tabs */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 mb-6">
              <div className="p-6 border-b border-white/10">
                <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
                  {['current', 'global'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTimeFilter(filter)}
                      className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                        timeFilter === filter
                          ? 'bg-white text-black shadow-sm'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {filter === 'current' ? 'Current Challenge' : 'All Time'}
                    </button>
                  ))}
                </div>
              </div>
  
              {/* User's Position Highlight */}
              {userPosition && (
                <div className="p-6 bg-white/5 backdrop-blur-sm border-b border-white/10 rounded-b-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Your Position</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(userPosition.rank)}
                          <span className="text-2xl font-bold">#{userPosition.rank}</span>
                          <span className="text-gray-300">{userPosition.player}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-400">{userPosition.score} pts</div>
                      <div className="text-sm text-gray-400">
                        {userPosition.lastActivity && `Last: ${formatDate(userPosition.lastActivity)}`}
                      </div>
                    </div>
                  </div>
                </div>
              )}
  
              {/* Leaderboard Table */}
              <div className="overflow-hidden">
                <div className="px-6 py-4 grid grid-cols-12 gap-4 text-sm font-medium text-gray-400 uppercase tracking-wider">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5">Player</div>
                  <div className="col-span-3">Score</div>
                  <div className="col-span-3">Last Activity</div>
                </div>
  
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading leaderboard...</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/10">
                    {leaderboardData.map((entry, index) => {
                      const isUserEntry = isCurrentUser(entry);
                      return (
                        <div
                          key={entry.userId || entry.id || index}
                          className={`px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-colors ${
                            isUserEntry ? 'bg-yellow-500/5 border-l-4 border-yellow-500' : ''
                          }`}
                        >
                          <div className="col-span-1">
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${getRankBadge(entry.rank)}`}>
                              {entry.rank <= 3 ? getRankIcon(entry.rank) : <span className="font-bold">#{entry.rank}</span>}
                            </div>
                          </div>
  
                          <div className="col-span-5">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                {entry.avatar ? (
                                  <img src={entry.avatar} alt={entry.player} className="w-10 h-10 rounded-full" />
                                ) : (
                                  <span className="text-white font-semibold text-sm">
                                    {entry.player.slice(0, 2).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div>
                                <div className="font-semibold flex items-center space-x-2 text-white">
                                  <span>{entry.player}</span>
                                  {isUserEntry && (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                                      You
                                    </span>
                                  )}
                                  {entry.rank === 1 && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                                </div>
                              </div>
                            </div>
                          </div>
  
                          <div className="col-span-3">
                            <div className={`text-2xl font-bold ${getScoreColor(entry.score)}`}>{entry.score}</div>
                          </div>
  
                          <div className="col-span-3 text-gray-400">
                            {formatDate(entry.lastActivity)}
                          </div>
                        </div>
                      );
                    })}
  
                    {leaderboardData.length === 0 && !loading && (
                      <div className="p-8 text-center text-gray-500">
                        {timeFilter === 'current'
                          ? 'No submissions yet for the current challenge.'
                          : 'No entries found for this leaderboard.'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
  
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Performers */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>Top Performers</span>
              </h3>
              <div className="space-y-4">
                {leaderboardData.slice(0, 3).map((entry, index) => (
                  <div
                    key={entry.userId || entry.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      index === 0
                        ? 'bg-yellow-500/10 border border-yellow-500/30'
                        : index === 1
                        ? 'bg-white/10 border border-white/20'
                        : 'bg-red-500/10 border border-red-500/30'
                    }`}
                  >
                    {getRankIcon(entry.rank)}
                    <div>
                      <div className="font-bold text-white">{entry.player}</div>
                      <div className="text-sm text-gray-300">{entry.score} pts</div>
                    </div>
                    <div className="ml-auto text-white text-xs px-2 py-1 rounded-full font-bold bg-white/10 border border-white/20">
                      #{entry.rank}
                    </div>
                  </div>
                ))}
  
                {leaderboardData.length === 0 && (
                  <div className="text-center text-gray-400 py-4">No entries available</div>
                )}
              </div>
            </div>
  
            {/* Challenge Stats */}
            {currentChallenge && timeFilter === 'current' && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Challenge Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Participants</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      {currentChallenge.totalParticipants || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Submissions</span>
                    <span className="text-xl font-semibold text-green-400">
                      {currentChallenge.totalSubmissions || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Max Score</span>
                    <span className="text-xl font-semibold text-blue-400">
                      {currentChallenge.maxScore}
                    </span>
                  </div>
                </div>
              </div>
            )}
  
            {/* Achievement Badges */}
            <div className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <Medal className="w-5 h-5" />
                <span>Achievements</span>
              </h3>
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-semibold">Leaderboard Climber</div>
                  <div className="text-sm text-yellow-100">Reach top 10 in any challenge</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-semibold">Speed Demon</div>
                  <div className="text-sm text-yellow-100">Submit within first hour</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-semibold">Consistency King</div>
                  <div className="text-sm text-yellow-100">Join 10 challenges in a row</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;