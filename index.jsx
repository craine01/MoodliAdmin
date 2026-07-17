
                  <div
                    className="w-3.5 sm:w-4 rounded-t-lg bg-[#8FBC8F] transition-all hover:brightness-95"
                    style={{ height: `${(d.revenue / maxChartVal) * 100}%` }}
                    title={`Revenue: ${peso(d.revenue)}`}
                  />
                  <div
                    className="w-3.5 sm:w-4 rounded-t-lg bg-[#D89B6A] transition-all hover:brightness-95"
                    style={{ height: `${(d.expense / maxChartVal) * 100}%` }}
                    title={`Expenses: ${peso(d.expense)}`}
                  />
                </div>
                <span className="text-xs font-medium text-[#9A9689]">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={17} className="text-[#B4652E]" />
            <p className="font-display text-base font-semibold text-[#3D3B36]">Cozy Reminders</p>
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-start gap-2.5 rounded-2xl bg-[#FBE7D6] p-3">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-[#B4652E]" />
                <p className="text-sm text-[#8A5A2E] leading-snug">
                  Low on <span className="font-semibold">{item.name}</span>! Only {item.stock} {item.unit} left.
                </p>
              </div>
            ))}
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#E8F0E6] p-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-[#5F7A5F]" />
              <p className="text-sm text-[#4E6B4E] leading-snug">Payday is coming up on the 30th — prep the payroll ledger.</p>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#E8F0E6] p-3">
              <Sparkles size={16} className="mt-0.5 shrink-0 text-[#5F7A5F]" />
              <p className="text-sm text-[#4E6B4E] leading-snug">New Froggy keychain design is ready for review 🐸</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Employees Page                                                      */
/* ------------------------------------------------------------------ */
function EmployeesPage({ employees, setEmployees }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "Assembler", rate: "", status: "Pending" });

  const addEmployee = () => {
    if (!form.name.trim() || !form.rate) return;
    setEmployees((prev) => [
      ...prev,
      { id: uid(), name: form.name.trim(), role: form.role, rate: Number(form.rate), cadence: "/day", status: form.status },
    ]);
    setForm({ name: "", role: "Assembler", rate: "", status: "Pending" });
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: e.status === "Paid" ? "Pending" : "Paid" } : e))
    );
  };

  const removeEmployee = (id) => setEmployees((prev) => prev.filter((e) => e.id !== id));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <SectionTitle icon={Users} title="Employees & Payroll" subtitle="Your little crew keeping Moodli cozy and running." />
        <PrimaryButton icon={UserPlus} onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Close" : "Add Employee"}
        </PrimaryButton>
      </div>

      {showForm && (
        <Card className="p-5 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <FieldLabel>Name</FieldLabel>
              <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Nico Aquino" />
            </div>
            <div>
              <FieldLabel>Role</FieldLabel>
              <select className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                {["Assembler", "Packer", "Designer", "Quality Checker", "Assistant"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Rate (₱/day)</FieldLabel>
              <input type="number" className={inputCls} value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} placeholder="500" />
            </div>
            <div>
              <FieldLabel>Payment Status</FieldLabel>
              <select className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option>Pending</option>
                <option>Paid</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <GhostButton onClick={() => setShowForm(false)}>Cancel</GhostButton>
            <PrimaryButton icon={Check} onClick={addEmployee}>Save Employee</PrimaryButton>
          </div>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F1EDE2] text-left text-xs font-semibold uppercase tracking-wide text-[#8A8677]">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Sahod Rate</th>
                <th className="px-5 py-3">Payment Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t border-[#EFEAE0] hover:bg-[#FAF9F6] transition-colors">
                  <td className="px-5 py-3.5 font-medium text-[#3D3B36]">{emp.name}</td>
                  <td className="px-5 py-3.5 text-[#6B685F]">{emp.role}</td>
                  <td className="px-5 py-3.5 text-[#6B685F]">{peso(emp.rate)}{emp.cadence}</td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggleStatus(emp.id)}>
                      <Badge tone={emp.status === "Paid" ? "sage" : "warn"}>
                        {emp.status === "Paid" ? <Check size={12} /> : <Clock size={12} />} {emp.status}
                      </Badge>
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => removeEmployee(emp.id)} className="text-[#B0503F] hover:text-[#8F3F30] transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="text-xs text-[#9A9689] mt-3">Tap a payment status badge to toggle between Paid and Pending.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Schedule / Weekly Ganap Page                                        */
/* ------------------------------------------------------------------ */
function SchedulePage({ events, setEvents }) {
  const [showForm, setShowForm] = useState(false);
  const [adopted, setAdopted] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", type: "Pop-up Market" });

  const addEvent = () => {
    if (!form.title.trim() || !form.date) return;
    setEvents((prev) => [...prev, { id: uid(), title: form.title.trim(), date: form.date, type: form.type }].sort((a, b) => a.date.localeCompare(b.date)));
    setForm({ title: "", date: "", type: "Pop-up Market" });
    setShowForm(false);
  };

  const removeEvent = (id) => setEvents((prev) => prev.filter((e) => e.id !== id));

  const adoptIdea = (idea) => {
    if (adopted.includes(idea.id)) return;
    setEvents((prev) => [...prev, { id: uid(), title: idea.title, date: "TBD", type: idea.tag }]);
    setAdopted((prev) => [...prev, idea.id]);
  };

  const typeTone = { "Pop-up Market": "sage", "Restock Day": "clay", Production: "rose", "Sales Event": "warn" };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <SectionTitle icon={CalendarDays} title="Weekly Ganap Hub" subtitle="Track real events and let Moodli suggest fresh ones." />
        <PrimaryButton icon={CalendarPlus} onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Close" : "Add Event"}
        </PrimaryButton>
      </div>

      {showForm && (
        <Card className="p-5 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <FieldLabel>Event Title</FieldLabel>
              <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Restock acrylic blanks" />
            </div>
            <div>
              <FieldLabel>Date</FieldLabel>
              <input type="date" className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <FieldLabel>Type</FieldLabel>
              <select className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {["Pop-up Market", "Restock Day", "Production", "Sales Event"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <GhostButton onClick={() => setShowForm(false)}>Cancel</GhostButton>
            <PrimaryButton icon={Check} onClick={addEvent}>Save Event</PrimaryButton>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Timeline */}
        <Card className="xl:col-span-2 p-6">
          <p className="font-display text-base font-semibold text-[#3D3B36] mb-5">Upcoming Timeline</p>
          <div className="relative pl-6 space-y-5 before:absolute before:left-[7px] before:top-1 before:bottom-1 before:w-[2px] before:bg-[#E3DECF]">
            {events.length === 0 && <p className="text-sm text-[#9A9689]">No events yet — add one above, or adopt a Ganap idea.</p>}
            {[...events].sort((a, b) => (a.date === "TBD" ? 1 : b.date === "TBD" ? -1 : a.date.localeCompare(b.date))).map((ev) => (
              <div key={ev.id} className="relative group">
                <span className="absolute -left-[26px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#8FBC8F] ring-4 ring-[#E8F0E6]" />
                <div className="flex items-start justify-between gap-3 rounded-2xl bg-[#FAF9F6] border border-[#EFEAE0] p-4">
                  <div>
                    <p className="text-xs font-semibold text-[#B4652E] mb-1">{fmtDate(ev.date)}</p>
                    <p className="text-sm font-medium text-[#3D3B36] leading-snug">{ev.title}</p>
                    <div className="mt-2"><Badge tone={typeTone[ev.type] || "sage"}>{ev.type}</Badge></div>
                  </div>
                  <button onClick={() => removeEvent(ev.id)} className="text-[#C7C2B4] hover:text-[#B0503F] transition-colors shrink-0">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Ganap Suggestions */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={17} className="text-[#B4652E]" />
            <p className="font-display text-base font-semibold text-[#3D3B36]">Moodli's Weekly Ganap Suggestions</p>
          </div>
          <p className="text-xs text-[#9A9689] mb-4">Fresh ideas tailored to a keychain craft studio.</p>
          <div className="space-y-3">
            {ganapIdeas.map((idea) => {
              const isAdopted = adopted.includes(idea.id);
              return (
                <div key={idea.id} className="rounded-2xl border border-[#EFEAE0] bg-[#FCFBF8] p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F0E6] text-[#5F7A5F] shrink-0">
                      <idea.icon size={14} />
                    </div>
                    <Badge tone="clay">{idea.tag}</Badge>
                  </div>
                  <p className="text-sm font-semibold text-[#3D3B36] leading-snug">{idea.title}</p>
                  <p className="text-xs text-[#8A8677] mt-1 leading-relaxed">{idea.desc}</p>
                  <button
                    onClick={() => adoptIdea(idea)}
                    disabled={isAdopted}
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      isAdopted
                        ? "bg-[#E8F0E6] text-[#7CA57C] cursor-default"
                        : "bg-[#8FBC8F] text-white hover:bg-[#7CAA7C] active:scale-95"
                    }`}
                  >
                    {isAdopted ? <Check size={13} /> : <Plus size={13} />}
                    {isAdopted ? "Adopted to Schedule" : "Adopt this Idea"}
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Budget Page                                                         */
/* ------------------------------------------------------------------ */
function BudgetPage({ transactions, setTransactions }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: "income", category: "", description: "", amount: "", date: todayISO });

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const addTransaction = () => {
    if (!form.category.trim() || !form.amount) return;
    setTransactions((prev) => [
      { id: uid(), type: form.type, category: form.category.trim(), description: form.description.trim(), amount: Number(form.amount), date: form.date },
      ...prev,
    ]);
    setForm({ type: "income", category: "", description: "", amount: "", date: todayISO });
    setShowForm(false);
  };

  const removeTransaction = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <SectionTitle icon={Wallet} title="Kita vs. Gastos Tracker" subtitle="Log every peso in and out of the studio." />
        <PrimaryButton icon={Plus} onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Close" : "Add Entry"}
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-[#5F7A5F] mb-2"><TrendingUp size={16} /><p className="text-xs font-semibold uppercase tracking-wide text-[#9A9689]">Total Kita (Income)</p></div>
          <p className="font-display text-2xl font-bold text-[#3D3B36]">{peso(totalIncome)}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-[#B4652E] mb-2"><TrendingDown size={16} /><p className="text-xs font-semibold uppercase tracking-wide text-[#9A9689]">Total Gastos (Expenses)</p></div>
          <p className="font-display text-2xl font-bold text-[#3D3B36]">{peso(totalExpense)}</p>
        </Card>
        <Card className="p-5 bg-[#E8F0E6]/60 border-[#D5E5D0]">
          <div className="flex items-center gap-2 text-[#4E6B4E] mb-2"><DollarSign size={16} /><p className="text-xs font-semibold uppercase tracking-wide text-[#6B8E6B]">Net Profit</p></div>
          <p className="font-display text-2xl font-bold text-[#3D3B36]">{peso(netProfit)}</p>
        </Card>
      </div>

      {showForm && (
        <Card className="p-5 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div>
              <FieldLabel>Type</FieldLabel>
              <select className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="income">Inflow (Kita)</option>
                <option value="expense">Outflow (Gastos)</option>
              </select>
            </div>
            <div>
              <FieldLabel>Category</FieldLabel>
              <input className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Raw Materials" />
            </div>
            <div className="sm:col-span-1">
              <FieldLabel>Description</FieldLabel>
              <input className={inputCls} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional note" />
            </div>
            <div>
              <FieldLabel>Amount (₱)</FieldLabel>
              <input type="number" className={inputCls} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0" />
            </div>
            <div>
              <FieldLabel>Date</FieldLabel>
              <input type="date" className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <GhostButton onClick={() => setShowForm(false)}>Cancel</GhostButton>
            <PrimaryButton icon={Check} onClick={addTransaction}>Save Entry</PrimaryButton>
          </div>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F1EDE2] text-left text-xs font-semibold uppercase tracking-wide text-[#8A8677]">
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3 text-right">Amount</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t border-[#EFEAE0] hover:bg-[#FAF9F6] transition-colors">
                  <td className="px-5 py-3.5 text-[#6B685F]">{fmtDate(t.date)}</td>
                  <td className="px-5 py-3.5 font-medium text-[#3D3B36]">{t.category}</td>
                  <td className="px-5 py-3.5 text-[#8A8677]">{t.description || "—"}</td>
                  <td className={`px-5 py-3.5 text-right font-semibold ${t.type === "income" ? "text-[#5F7A5F]" : "text-[#B4652E]"}`}>
                    {t.type === "income" ? "+" : "−"}{peso(t.amount)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => removeTransaction(t.id)} className="text-[#C7C2B4] hover:text-[#B0503F] transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inventory Page                                                      */
/* ------------------------------------------------------------------ */
function InventoryPage({ inventory, setInventory }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", stock: "", max: "", unit: "pcs", unitCost: "" });

  const addItem = () => {
    if (!form.name.trim() || !form.stock || !form.max) return;
    setInventory((prev) => [
      ...prev,
      { id: uid(), name: form.name.trim(), stock: Number(form.stock), max: Number(form.max), unit: form.unit, unitCost: Number(form.unitCost || 0) },
    ]);
    setForm({ name: "", stock: "", max: "", unit: "pcs", unitCost: "" });
    setShowForm(false);
  };

  const removeItem = (id) => setInventory((prev) => prev.filter((i) => i.id !== id));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <SectionTitle icon={Boxes} title="Raw Materials & Inventory" subtitle="Keep an eye on the studio's craft supplies." />
        <PrimaryButton icon={Plus} onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Close" : "Add Item"}
        </PrimaryButton>
      </div>

      {showForm && (
        <Card className="p-5 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div>
              <FieldLabel>Item Name</FieldLabel>
              <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ribbon Spools" />
            </div>
            <div>
              <FieldLabel>Current Stock</FieldLabel>
              <input type="number" className={inputCls} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0" />
            </div>
            <div>
              <FieldLabel>Full Stock Level</FieldLabel>
              <input type="number" className={inputCls} value={form.max} onChange={(e) => setForm({ ...form, max: e.target.value })} placeholder="100" />
            </div>
            <div>
              <FieldLabel>Unit</FieldLabel>
              <input className={inputCls} value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="pcs" />
            </div>
            <div>
              <FieldLabel>Unit Cost (₱)</FieldLabel>
              <input type="number" className={inputCls} value={form.unitCost} onChange={(e) => setForm({ ...form, unitCost: e.target.value })} placeholder="0" />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <GhostButton onClick={() => setShowForm(false)}>Cancel</GhostButton>
            <PrimaryButton icon={Check} onClick={addItem}>Save Item</PrimaryButton>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {inventory.map((item) => {
          const pct = Math.min(100, Math.round((item.stock / item.max) * 100));
          const low = pct < 30;
          return (
            <Card key={item.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-[#3D3B36]">{item.name}</p>
                  <p className="text-xs text-[#9A9689] mt-0.5">{peso(item.unitCost)} / {item.unit}</p>
                </div>
                <div className="flex items-center gap-2">
                  {low ? <Badge tone="warn"><AlertTriangle size={12} /> Low Stock</Badge> : <Badge tone="sage">Healthy</Badge>}
                  <button onClick={() => removeItem(item.id)} className="text-[#C7C2B4] hover:text-[#B0503F] transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <StockVine pct={pct} low={low} />
              <div className="flex items-center justify-between mt-3 text-xs text-[#9A9689]">
                <span>{item.stock} {item.unit} in stock</span>
                <span>{pct}% of {item.max}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing Calculator Page                                             */
/* ------------------------------------------------------------------ */
function PricingPage() {
  const [acrylic, setAcrylic] = useState(25);
  const [ring, setRing] = useState(5);
  const [packaging, setPackaging] = useState(8);
  const [labor, setLabor] = useState(20);
  const [margin, setMargin] = useState(60);

  const cost = Number(acrylic || 0) + Number(ring || 0) + Number(packaging || 0) + Number(labor || 0);
  const price = margin < 100 ? cost / (1 - margin / 100) : cost;
  const profit = price - cost;

  const Field = ({ label, value, setValue, icon: Icon }) => (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B7C9B4]" />
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${inputCls} pl-9`}
        />
      </div>
    </div>
  );

  return (
    <div>
      <SectionTitle icon={Calculator} title="COGS & Pricing Calculator" subtitle="Find your cost to make and a healthy retail price." />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <Card className="xl:col-span-3 p-6">
          <p className="font-display text-base font-semibold text-[#3D3B36] mb-5">Cost Breakdown</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Acrylic Blank Cost (₱)" value={acrylic} setValue={setAcrylic} icon={Package} />
            <Field label="Ring Cost (₱)" value={ring} setValue={setRing} icon={Boxes} />
            <Field label="Packaging Cost (₱)" value={packaging} setValue={setPackaging} icon={ShoppingBag} />
            <Field label="Estimated Labor Cost (₱)" value={labor} setValue={setLabor} icon={Users} />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-1.5">
              <FieldLabel>Target Margin</FieldLabel>
              <span className="text-sm font-semibold text-[#5F7A5F]">{margin}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="85"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-[#8FBC8F]"
            />
          </div>
        </Card>

        <Card className="xl:col-span-2 p-6 bg-[#E8F0E6]/60 border-[#D5E5D0] flex flex-col">
          <p className="font-display text-base font-semibold text-[#3D3B36] mb-5 flex items-center gap-2">
            <Sparkles size={16} className="text-[#5F7A5F]" /> Suggested Pricing
          </p>
          <div className="space-y-4 flex-1">
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8A8677]">Cost to Make</p>
              <p className="font-display text-2xl font-bold text-[#3D3B36] mt-1">{peso(cost)}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 border-2 border-[#8FBC8F]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#5F7A5F]">Recommended Retail Price</p>
              <p className="font-display text-3xl font-bold text-[#3D3B36] mt-1">{peso(price)}</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8A8677]">Profit per Piece</p>
              <p className="font-display text-xl font-bold text-[#4E6B4E] mt-1">{peso(profit)}</p>
            </div>
          </div>
          <p className="text-xs text-[#6B8E6B] mt-4 leading-relaxed">
            Formula: Retail Price = Cost to Make ÷ (1 − Margin). Adjust the slider to explore different margins.
          </p>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App Shell                                                           */
/* ------------------------------------------------------------------ */
export default function MoodliDashboard() {
  const [page, setPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employees, setEmployees] = useState(initialEmployees);
  const [events, setEvents] = useState(initialEvents);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [inventory, setInventory] = useState(initialInventory);

  const activeLabel = NAV_ITEMS.find((n) => n.key === page)?.label || "";

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#3D3B36]" style={{ fontFamily: "'Nunito', 'Quicksand', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fredoka', 'Nunito', sans-serif; }
      `}</style>

      <div className="flex min-h-screen">
        <Sidebar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} />

        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-[#EFEAE0] bg-[#FAF9F6]/90 backdrop-blur px-5 py-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-[#5C5A52]">
              <Menu size={22} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#9A9689]">Moodli Studio Admin</p>
              <p className="font-display text-base font-semibold truncate">{activeLabel}</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#E3DECF] bg-white px-3.5 py-2 text-sm text-[#9A9689]">
              <Search size={15} />
              <span className="text-xs">Search…</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#8FBC8F] text-white flex items-center justify-center font-display font-semibold text-sm shrink-0">
              M
            </div>
          </header>

          <main className="flex-1 p-5 sm:p-7 max-w-[1400px] w-full mx-auto">
            {page === "home" && <Overview transactions={transactions} employees={employees} events={events} inventory={inventory} />}
            {page === "employees" && <EmployeesPage employees={employees} setEmployees={setEmployees} />}
            {page === "schedule" && <SchedulePage events={events} setEvents={setEvents} />}
            {page === "budget" && <BudgetPage transactions={transactions} setTransactions={setTransactions} />}
            {page === "inventory" && <InventoryPage inventory={inventory} setInventory={setInventory} />}
            {page === "pricing" && <PricingPage />}
          </main>
        </div>
      </div>
    </div>
  );
}
