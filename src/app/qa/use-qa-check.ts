"use client";

import { useState, useEffect, useCallback } from "react";
import { QA_SECTIONS, getSectionItemIds, type QASection } from "./qa-data";

const STORAGE_KEY = "qa-checks-v1";

type CheckMap = Record<string, boolean>;

function loadChecks(): CheckMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveChecks(checks: CheckMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
  } catch {
    // localStorage full or unavailable
  }
}

export function useQACheck() {
  const [checks, setChecks] = useState<CheckMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setChecks(loadChecks());
    setLoaded(true);
  }, []);

  const toggle = useCallback((itemId: string) => {
    setChecks((prev) => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      saveChecks(next);
      return next;
    });
  }, []);

  const checkAll = useCallback((section: QASection) => {
    setChecks((prev) => {
      const next = { ...prev };
      const ids = getSectionItemIds(section);
      ids.forEach((id) => {
        next[id] = true;
      });
      saveChecks(next);
      return next;
    });
  }, []);

  const resetSection = useCallback((section: QASection) => {
    setChecks((prev) => {
      const next = { ...prev };
      const ids = getSectionItemIds(section);
      ids.forEach((id) => {
        delete next[id];
      });
      saveChecks(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setChecks({});
    saveChecks({});
  }, []);

  const getProgress = useCallback(
    (section?: QASection) => {
      if (!section) {
        // Total progress
        const allIds = QA_SECTIONS.flatMap((s) => getSectionItemIds(s));
        const checked = allIds.filter((id) => checks[id]).length;
        return { checked, total: allIds.length };
      }
      const ids = getSectionItemIds(section);
      const checked = ids.filter((id) => checks[id]).length;
      return { checked, total: ids.length };
    },
    [checks]
  );

  return { checks, loaded, toggle, checkAll, resetSection, resetAll, getProgress };
}
