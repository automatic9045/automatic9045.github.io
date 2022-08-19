using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using Automatic9045.AtsEx.PluginHost;
using Automatic9045.AtsEx.PluginHost.Handles;
using Automatic9045.AtsEx.PluginHost.Plugins;

namespace Automatic9045.VehiclePlugins.StateViewer {
    // 規定のクラスを継承することでプラグインとみなされます
    public class StateViewer : AssemblyPluginBase, IDisposable {
        private readonly StateForm Form;
        private readonly ToolStripMenuItem MenuItem;

        public StateViewer(PluginBuilder services) : base(services, PluginType.VehiclePlugin) {
            InstanceStore.Initialize(App, BveHacker);

            // 右クリックメニューに独自のメニューを追加可能
            MenuItem = BveHacker.ContextMenuHacker.AddCheckableMenuItem("状態ウィンドウを表示", MenuItemCheckedChanged);

            MenuItem.Checked = false;

            // 独自のフォーム（ウィンドウ）を表示可能
            Form = new StateForm();
            Form.FormClosing += FormClosing;
            Form.WindowState = FormWindowState.Normal;

            MenuItem.Checked = true;
            BveHacker.MainFormSource.Focus();
        }

        public override TickResult Tick(TimeSpan elapsed) {
            Form?.Tick();
            return new VehiclePluginTickResult(HandleCommandSet.DoNothing);
        }

        private void MenuItemCheckedChanged(object sender, EventArgs e) {
            if (MenuItem.Checked) {
                Form.Show(BveHacker.MainFormSource);
            } else {
                Form.Hide();
            }
        }

        private void FormClosing(object sender, FormClosingEventArgs e) {
            e.Cancel = true;
            MenuItem.Checked = false;
        }

        public void Dispose() {
            Form.FormClosing -= FormClosing;
            Form.Close();
            Form.Dispose();
        }
    }
}
