import React, { useState } from 'react';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Database,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  Mountain,
  HardDrive,
  Save,
  Clock,
  Plus
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import StatusIndicator from '../components/common/StatusIndicator';

export default function OfflineModePage() {
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState('Synced');
  const [observations, setObservations] = useState([
    {
      id: 'obs-01',
      mine: 'Rajrappa Open Cast Project',
      sector: 'Kargali Seam Bench 3',
      observation: 'Localized seepage of 4 L/min noted at bench toe contact with lower Barakar sandstone.',
      timestamp: 'Today at 09:30 AM',
      syncState: 'Synced'
    },
    {
      id: 'obs-02',
      mine: 'Gevra Megaproject',
      sector: 'Dump #4 NE Ramp',
      observation: 'Haul road tension crack widens to 8mm after morning shift dumper passes.',
      timestamp: 'Yesterday at 04:15 PM',
      syncState: 'Synced'
    }
  ]);

  const [newObsMine, setNewObsMine] = useState('Rajrappa Open Cast Project');
  const [newObsSector, setNewObsSector] = useState('');
  const [newObsText, setNewObsText] = useState('');

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    if (isOnline) {
      setSyncStatus('Offline');
    } else {
      setSyncStatus('Syncing');
      setTimeout(() => setSyncStatus('Synced'), 1200);
    }
  };

  const handleAddObservation = (e) => {
    e.preventDefault();
    if (!newObsText) return;

    const newEntry = {
      id: `obs-${Date.now()}`,
      mine: newObsMine,
      sector: newObsSector || 'General Pit Area',
      observation: newObsText,
      timestamp: 'Just now (Offline Draft)',
      syncState: isOnline ? 'Synced' : 'Pending Sync'
    };

    setObservations([newEntry, ...observations]);
    setNewObsSector('');
    setNewObsText('');
  };

  const handleTriggerSync = () => {
    setSyncStatus('Syncing');
    setTimeout(() => {
      setSyncStatus('Synced');
      setObservations((prev) =>
        prev.map((obs) => ({ ...obs, syncState: 'Synced' }))
      );
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold font-mono tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              PWA FIELD OPERATIONS &amp; CACHE ENGINE
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">IndexedDB Local Persistence</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Offline Mode &amp; Field Survey Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Enables geologists in remote pits and deep shafts to view cached stratigraphy, inspect geological maps, and log field observations without network connectivity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={isOnline ? 'outline' : 'danger'}
            size="sm"
            icon={isOnline ? Wifi : WifiOff}
            onClick={handleToggleOnline}
          >
            {isOnline ? 'Simulate Network Disconnect' : 'Reconnect to HQ Network'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={RefreshCw}
            disabled={!isOnline || syncStatus === 'Syncing'}
            onClick={handleTriggerSync}
          >
            {syncStatus === 'Syncing' ? 'Syncing...' : 'Sync Local Cache'}
          </Button>
        </div>
      </div>

      {/* Connectivity Status Banner */}
      <div
        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isOnline
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">
                {isOnline ? 'Network State: HQ Connected (Online)' : 'Network State: Offline Field Mode Active'}
              </span>
              <StatusIndicator status={isOnline ? 'Online' : 'Offline'} pulse={isOnline} />
            </div>
            <p className="text-xs opacity-80 mt-0.5">
              {isOnline
                ? 'All field sync queues are synchronized with the central CMPDI PostgreSQL database.'
                : 'Operating in local IndexedDB sandbox. Remote AI queries require connection, but cached maps and observations persist locally.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={syncStatus === 'Synced' ? 'emerald' : 'amber'} size="md">
            Sync Status: {syncStatus}
          </Badge>
        </div>
      </div>

      {/* Cached Assets Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <HardDrive className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold uppercase">Cached Mines</span>
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">8 Colliery Profiles</div>
          <span className="text-[11px] text-slate-500">Full lithology &amp; coordinates</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold uppercase">Cached Reports</span>
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">14 Reports</div>
          <span className="text-[11px] text-slate-500">Available for offline PDF view</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold uppercase">Cached Map Tiles</span>
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">6 Coal Basins</div>
          <span className="text-[11px] text-slate-500">Zoom level 4 to 11 pre-cached</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Database className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold uppercase">Pending Sync Queue</span>
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">
            {observations.filter((o) => o.syncState !== 'Synced').length} Records
          </div>
          <span className="text-[11px] text-slate-500">Will auto-upload on reconnection</span>
        </div>
      </div>

      {/* 2-Column Section: Create Field Observation (Left) and Local Observations Log (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Create Field Observation Form */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
            <Plus className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Log Field Geological Observation
            </h3>
          </div>

          <form onSubmit={handleAddObservation} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">
                Select Mine Project:
              </label>
              <select
                value={newObsMine}
                onChange={(e) => setNewObsMine(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-800"
              >
                <option>Rajrappa Open Cast Project</option>
                <option>Moonidih Deep Shaft Colliery</option>
                <option>Gevra Megaproject</option>
                <option>Jayant Open Cast Project</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">
                Pit Sector / Bench / Horizon:
              </label>
              <input
                type="text"
                value={newObsSector}
                onChange={(e) => setNewObsSector(e.target.value)}
                placeholder="e.g., Kargali Seam Bench 4, East Face"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">
                Field Strata / Hydrological Observation:
              </label>
              <textarea
                rows={3}
                value={newObsText}
                onChange={(e) => setNewObsText(e.target.value)}
                placeholder="Record joint spacing, visible water weeping, tension cracks, or strata shift..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800"
              />
            </div>

            <Button
              variant="primary"
              size="sm"
              type="submit"
              icon={Save}
              className="w-full"
            >
              Save Observation to Local Cache
            </Button>
          </form>
        </div>

        {/* Local Observations Stream */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Local Field Observations ({observations.length})
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">Stored in browser IndexedDB</span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[380px]">
            {observations.map((obs) => (
              <div
                key={obs.id}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{obs.mine}</span>
                    <span className="text-[11px] text-slate-500 block font-mono">
                      Sector: {obs.sector}
                    </span>
                  </div>
                  <Badge
                    variant={obs.syncState === 'Synced' ? 'emerald' : 'amber'}
                    size="sm"
                    dot
                  >
                    {obs.syncState}
                  </Badge>
                </div>

                <p className="text-xs text-slate-700 mt-2 bg-white p-2 rounded border border-slate-100 leading-relaxed">
                  {obs.observation}
                </p>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {obs.timestamp}
                  </span>
                  <span className="font-mono">ID: {obs.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
