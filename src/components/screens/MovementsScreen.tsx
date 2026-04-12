import React from 'react';
import { Search, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_TRANSACTIONS } from '../../types';

export default function MovementsScreen() {
  const groups = ['Hoy', 'Ayer'];

  return (
    <div className="space-y-12">
      {/* Search Bar */}
      <section className="w-full">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-outline w-6 h-6" />
          <input 
            className="w-full h-[72px] pl-16 pr-6 bg-surface-container-low border-none rounded-xl text-xl focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-outline/60" 
            placeholder="Buscar por descripción o monto..." 
            type="text"
          />
        </div>
      </section>

      {/* Transactions List */}
      <section className="space-y-10">
        {groups.map((group) => (
          <div key={group} className="space-y-4">
            <h3 className="text-[1.375rem] font-bold text-on-surface/50 px-2">{group}</h3>
            <div className="space-y-4">
              {MOCK_TRANSACTIONS.filter(tx => tx.date === group).map((tx) => (
                <motion.div 
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-xl hover:bg-surface-container transition-colors cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      tx.type === 'EXPENSE' ? 'bg-error-container text-error' : 'bg-secondary-container text-on-secondary-container'
                    }`}>
                      {tx.type === 'EXPENSE' ? <ArrowUp className="w-8 h-8" /> : <ArrowDown className="w-8 h-8" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-on-surface">{tx.title}</h4>
                      <p className="text-on-surface-variant font-medium">{tx.time} • {tx.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-black ${tx.type === 'EXPENSE' ? 'text-error' : 'text-secondary'}`}>
                      {tx.type === 'EXPENSE' ? '-' : '+'}${Math.abs(tx.amount).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
