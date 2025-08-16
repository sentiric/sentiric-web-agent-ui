import AgentWorkspace from "@/components/agent/AgentWorkspace";
import React from 'react';

// Bu sayfanın hangi layout'u kullanacağını belirtiyoruz
// (Bu durumda varsayılan layout'u kullanacak, bu yüzden getLayout'a gerek yoktu ama
//  diğer sayfalarla tutarlılık için ekleyebiliriz veya _app.tsx'teki varsayılana güvenebiliriz)
export default function AgentWorkspacePage() {
  return <AgentWorkspace />;
}