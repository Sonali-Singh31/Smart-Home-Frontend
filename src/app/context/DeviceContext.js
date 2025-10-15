'use client';
import { createContext, useState, useEffect, useCallback } from 'react';
import axios from '../api/axios';

export const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const [user, setUser] = useState(null);
  const [devices, setDevices] = useState([]);
  const [scenes, setScenes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [logs, setLogs] = useState([]);

  // ------------------- Load user from localStorage -------------------
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('user');
        if (savedUser && savedUser !== 'undefined') {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (err) {
      console.error('Error parsing user:', err);
      localStorage.removeItem('user');
    }
  }, []);

  // ------------------- Fetch all data -------------------
  const fetchAll = useCallback(async () => {
    try {
      const [dRes, sRes, schRes] = await Promise.all([
        axios.get('/devices'),
        axios.get('/scenes'),
        axios.get('/schedules'),
      ]);

      setDevices(dRes.data);
      setScenes(
        sRes.data.map(scene => ({
          ...scene,
          actions: scene.actions.map(a => ({
            ...a,
            deviceName: a.deviceId?.name || 'Unknown Device',
          })),
        }))
      );
      setSchedules(schRes.data || []);
    } catch (err) {
      if (err.response)
        console.error('Backend error:', err.response.status, err.response.data);
      else if (err.request)
        console.error('No response received:', err.request);
      else
        console.error('Error setting up request:', err.message);
    }
  }, []);

  // ------------------- Fetch logs -------------------
  const fetchLogs = useCallback(async () => {
    try {
      const res = await axios.get('/logs');
      setLogs(res.data);
    } catch (err) {
      if (err.response)
        console.error('Backend error fetching logs:', err.response.data);
      else if (err.request)
        console.error('No response received fetching logs:', err.request);
      else
        console.error('Error fetching logs:', err.message);
    }
  }, []);

  // ------------------- Trigger data fetch when user is available -------------------
  useEffect(() => {
    if (user) {
      fetchAll();
      fetchLogs();
    }
  }, [user, fetchAll, fetchLogs]);

  // ------------------- Keep user/token synced -------------------
  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  // ------------------- Device Helpers -------------------
  const addDeviceToState = (device) => setDevices(prev => [device, ...prev]);
  const updateDeviceInState = (updatedDevice) =>
    setDevices(prev => prev.map(d => d._id === updatedDevice._id ? updatedDevice : d));
  const removeDeviceFromState = (id) =>
    setDevices(prev => prev.filter(d => d._id !== id));

  const toggleDevice = async (id) => {
    try {
      const res = await axios.post(`/devices/${id}/toggle`);
      updateDeviceInState(res.data);
      fetchLogs();
    } catch (err) {
      console.error('Failed to toggle device:', err);
      alert('Failed to toggle device');
    }
  };

  // ------------------- Scene Helpers -------------------
  const addSceneToState = (scene) => setScenes(prev => [scene, ...prev]);
  const updateSceneInState = (scene) =>
    setScenes(prev => prev.map(s => s._id === scene._id ? scene : s));

  // ------------------- Schedule Helpers -------------------
  const addScheduleToState = (schedule) => setSchedules(prev => [schedule, ...prev]);
  const updateScheduleInState = (schedule) =>
    setSchedules(prev => prev.map(s => s._id === schedule._id ? schedule : s));
  const removeScheduleFromState = (id) =>
    setSchedules(prev => prev.filter(s => s._id !== id));

  const toggleSchedule = async (id) => {
    try {
      const res = await axios.post(`/schedules/${id}/toggle`);
      updateScheduleInState(res.data);
      fetchLogs();
    } catch (err) {
      console.error('Failed to toggle schedule:', err);
      alert('Failed to toggle schedule');
    }
  };

  // ------------------- Logs Helpers -------------------
  const emitLog = (log) => setLogs(prev => [log, ...prev]);

  // ------------------- Provider Value -------------------
  return (
    <DeviceContext.Provider value={{
      user,
      setUser,
      devices,
      scenes,
      schedules,
      logs,
      refreshDevices: fetchAll,
      fetchLogs,
      addDeviceToState,
      updateDeviceInState,
      removeDeviceFromState,
      toggleDevice,
      addSceneToState,
      updateSceneInState,
      addScheduleToState,
      updateScheduleInState,
      removeScheduleFromState,
      toggleSchedule,
      emitLog,
    }}>
      {children}
    </DeviceContext.Provider>
  );
}
