import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { SessionTypes } from '@walletconnect/types';

type Sessions = SessionTypes.Struct[];

type SessionsStorage = BaseStorage<Sessions> & {
  add: (s: SessionTypes.Struct) => void;
  update: (topic: string, s: SessionTypes.Struct) => void;
  remove: (topic: string) => void;
};

const storage = createStorage<Sessions>('sessions', [], {
  storageType: StorageType.Local,
});

const sessionsStorage: SessionsStorage = {
  ...storage,
  add: session => {
    storage.set(sessions => [...sessions, session]);
  },
  remove: topic => {
    storage.set(sessions => sessions.filter(x => x.topic !== topic));
  },
  update: (topic, s) => {
    storage.set(sessions => sessions.map(x => (x.topic === topic ? s : x)));
  },
};

export default sessionsStorage;
